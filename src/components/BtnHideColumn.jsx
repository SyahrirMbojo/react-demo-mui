import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import ViewWeekRoundedIcon from "@mui/icons-material/ViewWeekRounded";
import React, { useCallback } from "react";
import MenuLists from "./MenuLists";

function BtnHideColumn(props) {
  const { apiref } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [visibleColumn, setVisibleColumn] = React.useState([]);

  React.useEffect(() => {
    setVisibleColumn(apiref.current.getVisibleColumns());
  }, []);

  const handleChange = useCallback((ind, field, isvisible) => (event) => {
    const updatecol = [...visibleColumn];
    updatecol[ind].hideable = !isvisible;
    setVisibleColumn(updatecol);

    apiref.current.setColumnVisibility(field, !isvisible);
  });

  const handleReset = (event) => {
    const resetcol = [...visibleColumn];
    resetcol.map((col) => {
      apiref.current.setColumnVisibility(col.field, true);
      col.hideable = true;
      return col;
    });
    setVisibleColumn(resetcol);
  };

  const handleClick = (event) => {
    if (visibleColumn.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        <ViewWeekRoundedIcon />
      </IconButton>

      <MenuLists
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        arrowPosition="left"
      >
        <FormGroup sx={{ pl: 2.5, pr: 1 }}>
          {visibleColumn.map((col, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={col.hideable}
                    onChange={handleChange(index, col.field, col.hideable)}
                  />
                }
                label={
                  col.type === "actions"
                    ? "Actions"
                    : col.type === "checkboxSelection"
                    ? "Checkbox"
                    : col.headerName
                }
              />
            );
          })}
        </FormGroup>
        <div
          style={{
            padding: "10px",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </MenuLists>
    </>
  );
}

export default BtnHideColumn;
