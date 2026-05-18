import { Avatar, Typography } from "@mui/material";
import React from "react";
import PIC from "../assets";
import styled from "@emotion/styled";

const BrandTitle = styled("div")(({ theme }) => ({
  display: "flex",
  color: theme.palette.primary.contrastText,
}));

function Brand(props) {
  return (
    <BrandTitle {...props}>
      <Avatar
        alt="logo"
        src={PIC.logoDefa}
        sx={{ width: 30, height: 30, mr: 1 }}
      />
      <Typography component="h1" variant="h6" color="inherit" noWrap>
        go
        <span>
          <b>System</b>
        </span>
      </Typography>
    </BrandTitle>
  );
}

export default Brand;
