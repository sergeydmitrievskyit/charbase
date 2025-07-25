import { ConfirmDialog } from 'primereact/confirmdialog';

interface DeletePopupProps {
    visible: boolean;
    name: string;
    onHide: () => void;
    onAccept: () => void;
    onReject: () => void;
}

export const DeletePopup = ({
    visible,
    name,
    onHide,
    onAccept,
    onReject
}: DeletePopupProps) => (
    <ConfirmDialog
        visible={visible}
        onHide={onHide}
        message={`Are you sure you want to delete ${name}`}
        header="Delete"
        icon="pi pi-exclamation-triangle"
        acceptClassName="p-button-danger"
        accept={onAccept}
        reject={onReject} />
)