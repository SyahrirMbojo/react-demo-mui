import styled from "@emotion/styled";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React from "react";

const MyDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    borderRadius: 10,
  },
}));

function CustomDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  // onClose: PropTypes.func.isRequired,
};

function DialogView(props) {
  const {
    title,
    desc,
    actions,
    closedialog,
    nodivider = false,
    children,
  } = props;
  return (
    <MyDialog {...props}>
      <CustomDialogTitle onClose={closedialog}>{title}</CustomDialogTitle>
      <DialogContent dividers={!nodivider}>
        <DialogContentText sx={{ pb: desc ? 2 : 0 }}>{desc}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </MyDialog>
  );
}

export default DialogView;
