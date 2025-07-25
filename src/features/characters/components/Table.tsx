import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Actions } from './Actions';
import { Character, CharacterId } from "../../../types/character";
import { Chip } from "primereact/chip";

interface TableProps {
    characters: Character[],
    onEdit: (character: Character) => void,
    onDelete: (id: CharacterId) => void
}

export const Table = ({
    characters,
    onEdit,
    onDelete
}: TableProps) => {
    const categoryBodyTemplate = (character: Character) => (
        <div>
            {character.categories.map((category: string) => (
                <Chip
                    key={category}
                    label={category}/>
            ))}
        </div>
    )

    const actionsBodyTemplate = (character: Character) => (
        <Actions
            onEdit={() => onEdit(character)}
            onDelete={() => onDelete(character.id)}/>
    )

    return (
        <DataTable value={characters}>
            <Column
                header="Name"
                field="name"/>

            <Column
                header="Category"
                body={categoryBodyTemplate}/>

            <Column
                header="Actions"
                body={actionsBodyTemplate}/>
        </DataTable>
    )
}