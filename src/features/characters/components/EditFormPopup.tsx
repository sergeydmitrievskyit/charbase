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
        mode: 'onChange'
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
            modal
            className="w-full max-w-[80vw]">
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 p-1 sm:p-2">
                
                {/* Name input */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor='name'
                        className="text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <InputText
                        id='name'
                        {...register('name', {
                            required: 'Name is required',
                            maxLength: {
                                value: 40,
                                message: 'Maximum length 40 symbols'
                            }
                        })}
                        className={`w-full ${errors.name ? 'p-invalid' : ''}`}/>
                    {errors.name && <small className="p-error text-sm">{errors.name.message}</small>}
                </div>

                {/* Categories input */}
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor='categories'
                        className="text-sm font-medium text-gray-700">
                        Categories:
                    </label>
                    <Controller
                        name='categories'
                        control={control}
                        rules={{
                            required: 'Minimum 1 category',
                            validate: (value) => {
                                if (value && value.length > 5) {
                                    return 'Maximum 5 categories'
                                }
                                return true;
                            }
                        }}
                        render={({field}) => (
                            <div className="w-full min-w-0 relative"> 
                                <MultiSelect
                                        id='categories'
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.value)
                                        }}
                                        options={CATEGORIES}
                                        display='chip'
                                        filter
                                        className={`w-full ${errors.categories ? 'p-invalid' : ''}`}
                                        panelClassName="max-w-full"
                                        style={{ minWidth: 0, width: '100%' }}/>
                            </div>
                        )}
                    />
                    {errors.categories && <small className="p-error text-sm">{errors.categories.message}</small>}
                </div>

                {/* Action buttons */}
                <div className='flex flex-wrap gap-1 justify-end pt-2 mt-6'>
                    <Button
                        type='button'
                        label='Cancel'
                        severity='secondary'
                        onClick={handleCancel}/>

                    <Button
                        type='submit'
                        label='Save'
                        severity='success'/>
                </div>
            </form>    
        </Dialog>
    )
}