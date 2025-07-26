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
        <div className='flex flex-wrap gap-1 justify-start'>
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
        <div className="overflow-x-auto max-w-full sm:rounded-md">
            <DataTable
                tableClassName="table-fixed min-w-[400px]"
                value={characters}
                removableSort
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={onSort}>
                <Column
                    style={{ width: '40%' }}
                    header="Name"
                    field='name'
                    bodyClassName='text-ellipsis whitespace-nowrap overflow-hidden'
                    sortable/>

                <Column
                    style={{ width: '40%' }}
                    header="Category"
                    field='category'
                    body={categoryBodyTemplate}
                    sortable/>

                <Column
                    style={{ width: '120px' }}
                    header="Actions"
                    body={actionsBodyTemplate}/>
            </DataTable>
        </div>
    )
}