import Button from "@mui/material/Button";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// ----------------------------------------------------------------------

type TConfirmDialogProps = Omit<DialogProps, "title" | "content"> & {
  onClose: DialogProps["onClose"] &
    ((e?: React.MouseEvent<HTMLElement>) => void);
  cancelLabel?: string;
  title: React.ReactNode;
  action: React.ReactNode;
  content?: React.ReactNode;
};

export function ConfirmDialog({
  open,
  title,
  action,
  cancelLabel = "ยกเลิก",
  content,
  onClose,
  ...other
}: TConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: "body2" }}> {content} </DialogContent>
      )}
      <DialogActions>
        <Button id="dialog-cancel-button" variant="outlined" onClick={onClose}>
          {cancelLabel}
        </Button>

        {action}
      </DialogActions>
    </Dialog>
  );
}
