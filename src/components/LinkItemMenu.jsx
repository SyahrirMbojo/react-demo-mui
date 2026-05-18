import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

function LinkItemMenu(props) {
  const { icon, title, path, selected, onclick, disabled } = props;

  return (
    <Fragment>
      {!disabled || "" ? (
        <ListItemButton
          component={NavLink}
          to={path}
          selected={selected}
          onClick={onclick}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      ) : (
        <ListSubheader
          component="div"
          inset
          style={{ backgroundColor: "transparent", position: "relative" }}
        >
          {title}
        </ListSubheader>
      )}
    </Fragment>
  );
}

export default LinkItemMenu;
