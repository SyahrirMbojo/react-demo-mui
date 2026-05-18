import styled from "@emotion/styled";
import { Menu, alpha } from "@mui/material";
import React from "react";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: props.arrowPosition,
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: props.arrowPosition,
    }}
    slotProps={{
      paper: {
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1,
          borderRadius: 2.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            ...(props.arrowPosition && {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: props.arrowPosition === "right" ? 14 : undefined,
              left: props.arrowPosition === "left" ? 14 : undefined,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            }),
          },
        },
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: 180,
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function MenuLists(props) {
  const { children } = props;
  return <StyledMenu {...props}>{children}</StyledMenu>;
}

export default MenuLists;
