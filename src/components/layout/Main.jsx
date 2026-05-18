import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";

const AppFrame = styled("div")(() => ({
  display: "flex",
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: 1,
}));

const MainContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  height: "100vh",
  width: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  position: "relative",
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(3),
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.down("lg")]: {
    paddingLeft: theme.spacing(2),
  },
}));

const BgHeaderContent = styled("div")(({ theme }) => ({
  position: "fixed",
  width: "100%",
  height: "184px",
  left: 0,
  right: 0,
  top: 0,
  backgroundColor: theme.palette.primary.main,
}));

const MyContainer = styled("div")(() => ({
  minHeight: `calc(100% - 180px)`,
  paddingRight: 5,
}));

function Main() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const mainContent = document.getElementById("mainContent");
    mainContent.addEventListener("scroll", handleScroll);

    return () => mainContent.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (event) => {
    const scroll = event.target.scrollTop;
    if (scroll > 20) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  return (
    <>
      <BgHeaderContent />
      <AppFrame>
        <Header open={open} toggleDrawer={toggleDrawer} isScroll={isScroll} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} isScroll={isScroll} />
        <MainContent open={open} id="mainContent">
          <Toolbar />
          <Breadcrumb />
          <MyContainer>
            <Outlet />
          </MyContainer>
          <Footer />
        </MainContent>
      </AppFrame>
    </>
  );
}

export default Main;
