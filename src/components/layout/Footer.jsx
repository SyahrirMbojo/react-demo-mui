import { Typography } from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";

const MainFooter = styled("div")(({ theme }) => ({
  paddingTop: 40,
}));

function Footer() {
  return (
    <MainFooter>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/" underline="none">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </MainFooter>
  );
}

export default Footer;
