import {
    DataTable,
    DataTableStateEvent
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Actions } from './Actions';
import { Character } from "../../../types/character";
import { Chip } from "primereact/chip";
import { SortOrder } from 'primereact/api';

interface TableProps {
    characters: Character[],
    sortField: string,
    sortOrder: SortOrder,
    onSort: (event: DataTableStateEvent) => void,
    onEdit: (character: Character) => void,
    onDelete: (character: Character) => void
}

export const Table = ({
    characters,
    sortField,
    sortOrder,
    onSort,
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
            onDelete={() => onDelete(character)}/>
    )

    return (
        <DataTable
            value={characters}
            removableSort
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}>
            <Column
                header="Name"
                field='name'
                sortable/>

            <Column
                header="Category"
                field='category'
                body={categoryBodyTemplate}
                sortable/>

            <Column
                header="Actions"
                body={actionsBodyTemplate}/>
        </DataTable>
    )
}