import { useEffect } from "react";
import {
    useForm,
    Controller
} from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Character, CharacterEditForm } from "../../../types/character";
import { CATEGORIES } from "../constants";

interface EditFormPopupProps {
    onHide: () => void;
    character: Character;
    onSubmit: (characterChanges: CharacterEditForm) => void
}

export const EditFormPopup = ({
    onHide,
    character,
    onSubmit
}: EditFormPopupProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        reset
    } = useForm<CharacterEditForm>({
        mode: 'onSubmit'
    })

    useEffect(() => {
        setValue('name', character.name)
        setValue('categories', character.categories)
    }, [character, setValue])

    const handleFormSubmit = (characterChanges: CharacterEditForm) => {
        onSubmit(characterChanges)

        onHide();
        reset();
    }

    const handleCancel = () => {
        onHide();
        reset();
    }

    return (
        <Dialog
            visible={true}
            onHide={handleCancel}
            header={`Edit ${character.name}`}
            modal>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <InputText
                            id='name'
                            {...register('name', {
                                required: 'Name is required',
                                maxLength: {
                                    value: 40,
                                    message: 'Name is no longer 40 characters'
                                }
                            })}
                            className={errors.name ? 'p-invalid' : ''}/>
                        {errors.name && <small className="p-error">{errors.name.message}</small>}
                    </div>
                </div>

                <div>
                    <label htmlFor='categories'>Categories:</label>
                    <Controller
                        name='categories'
                        control={control}
                        rules={{
                            required: 'Choose at least one category',
                            validate: (value) => {
                                if (value && value.length > 5) {
                                    return 'You can choose 5 categories maximum'
                                }
                                return true;
                            }
                        }}
                        render={({field, fieldState}) => (
                           <MultiSelect
                                id='categories'
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.value)
                                }}
                                options={CATEGORIES}
                                display='chip'
                                filter
                                className={fieldState.error ? 'p-invalid' : ''}
                            />
                        )}
                    />
                    {errors.categories && <small className="p-error">{errors.categories.message}</small>}
                </div>

                <div>
                    <Button
                        type='button'
                        label='Cancel'
                        severity='secondary'
                        onClick={handleCancel}/>

                    <Button
                        type='submit'
                        label='Save'
                        security='success'/>
                </div>
            </form>    
        </Dialog>
    )
}