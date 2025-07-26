import { ConfirmDialog } from "primereact/confirmdialog"

type DeletePopupProps = {
  name: string
  onHide: () => void
  onAccept: () => void
  onReject: () => void
}

export const DeletePopup = ({
  name,
  onHide,
  onAccept,
  onReject,
}: DeletePopupProps) => (
  <ConfirmDialog
    visible={true}
    onHide={onHide}
    message={`Are you sure you want to delete ${name}`}
    header={`Delete ${name}`}
    icon="pi pi-exclamation-triangle"
    acceptClassName="p-button-danger"
    accept={onAccept}
    reject={onReject}
    className="w-full max-w-[80vw]"
    draggable={false}/>
)
