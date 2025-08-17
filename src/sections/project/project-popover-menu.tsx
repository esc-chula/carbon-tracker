import { MoreVert } from "@mui/icons-material";
import { IconButton, Popover } from "@mui/material";
import { useState, type PropsWithChildren } from "react";

// ---------------------------------------------------------------------------------

function ProjectPopoverMenu({ children }: PropsWithChildren) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "project-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert sx={{ color: "#454F5B" }} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{ paper: { sx: { minWidth: 200, py: 1, borderRadius: 1 } } }}
      >
        {children}
      </Popover>
    </>
  );
}

export default ProjectPopoverMenu;
