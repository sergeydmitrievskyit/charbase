import { Button } from 'primereact/button';

interface ActionsProps {
    onEdit: () => void;
    onDelete: () => void
}

export const Actions = ({
    onEdit,
    onDelete
}: ActionsProps) => {
    return (
        <div>
            <Button
                label="Edit"
                severity="secondary"
                onClick={onEdit}/>
            
            <Button
                label="Delete"
                severity="danger"
                onClick={onDelete}/>
        </div>
    )
}