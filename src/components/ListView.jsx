import { List } from "@mui/material";
import React from "react";

function ListView(props) {
  const { direction, children } = props;
  return (
    <div
      style={
        direction === "row" ? { overflowX: "auto" } : { overflowY: "auto" }
      }
    >
      <List style={{ display: "flex", flexDirection: direction }}>
        {children}
      </List>
    </div>
  );
}

export default ListView;
