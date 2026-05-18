import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";

function SearchView({ onClearValue, onChangeValue, ...props }) {
  const [issearch, setIssearch] = React.useState("");
  const inputRef = React.useRef();

  const handleChange = (event) => {
    setIssearch(event.target.value);
    onChangeValue(event);
  };

  const handleClear = (event) => {
    setIssearch("");
    inputRef.current.focus();
    onClearValue(event);
  };

  return (
    <>
      <TextField
        {...props}
        label="Search"
        value={issearch}
        sx={{
          width: {
            xs: "100%",
            sm: 300,
          },
        }}
        inputRef={inputRef}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {issearch.length > 0 ? (
                <IconButton
                  size="small"
                  sx={{ padding: 0, marginRight: -1 }}
                  onClick={handleClear}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : (
                <SearchIcon sx={{ marginRight: -1 }} />
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default SearchView;
