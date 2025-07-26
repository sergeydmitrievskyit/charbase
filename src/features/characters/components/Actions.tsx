import { Button } from "primereact/button"

type ActionsProps = {
  onEdit: () => void
  onDelete: () => void
}

export const Actions = ({ onEdit, onDelete }: ActionsProps) => {
  return (
    <div className="flex flex-wrap gap-1 justify-start">
      <Button
        label="Edit"
        severity="secondary"
        onClick={onEdit}
        className="w-full lg:w-auto"
      />

      <Button
        label="Delete"
        severity="danger"
        onClick={onDelete}
        className="w-full lg:w-auto"
      />
    </div>
  )
}
