import {
  Avatar,
  Badge,
  Divider,
  Hidden,
  List,
  SwipeableDrawer,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import MuiDrawer from "@mui/material/Drawer";
import Brand from "../Brand";
import { useLocation } from "react-router-dom";
import LinkItemMenu from "../LinkItemMenu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import PIC from "../../assets";

const drawerOpen = 240;
const drawerClose = 75;
const sizeBig = 80;
const sizeSmall = 50;
const heightToolbar = 64;

const DrawerInner = styled("div")(({ theme, open }) => ({
  width: drawerOpen,
  height: "100%",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    ...(!open && {
      width: drawerClose,
      position: "absolute",
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      "& .titleUser": {
        display: "none",
      },
      "& .menuContainer": {
        overflowY: "hidden",
        paddingRight: 0,
      },
      "& .MuiListItemText-root, & .MuiListSubheader-root": {
        opacity: 0,
      },
      "&:hover": {
        position: "fixed",
        width: drawerOpen,
        boxShadow: theme.shadows[6],
        "& .imguser": {
          width: sizeBig,
          height: sizeBig,
        },
        "& .menuContainer": {
          overflowY: "auto",
          paddingRight: 10,
        },
        "& .titleUser": {
          display: "block",
        },
        "& .MuiListItemText-root, & .MuiListSubheader-root": {
          opacity: 1,
        },
        "& .brand": {
          boxShadow: theme.shadows[6],
        },
      },
    }),
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: 0,
  "& h3": {
    color: theme.palette.primary.contrastText,
  },
}));

const MyBrand = styled(Brand)(({ theme, isscroll }) => ({
  height: heightToolbar,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 10px 5px",
  transition: theme.transitions.create(["width", "margin", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  "&:after": {
    transition: theme.transitions.create(["box-shadow"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  ...(isscroll && {
    background: theme.palette.primary.dark,
  }),
}));

const MenuContainer = styled("div")(({ theme }) => ({
  overflow: "auto",
  height: "calc(100% - 185px)",
  position: "relative",
  display: "block",
  paddingRight: 10,
  "& .MuiListItemButton-root": {
    paddingLeft: 25,
    borderRadius: "0px 15px 15px 0px",
  },
  "& .Mui-selected, & .Mui-focusVisible": {
    borderRadius: "0px 15px 15px 0px",
    color: theme.palette.primary.main,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.dark,
    },
  },
}));

const ProfileUser = styled("div")(({ theme }) => ({
  height: 120,
  display: "flex",
  fontSize: 14,
  padding: 10,
  alignItems: "center",
  justifyContent: "center",
  "& h4": {
    fontSize: 18,
    marginBottom: 0,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: 110,
  },
  "& span": {
    fontSize: 12,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: 110,
    display: "block",
    overflow: "hidden",
  },
}));

const ImgUser = styled(Avatar)(({ theme, open }) => ({
  width: sizeBig,
  height: sizeBig,
  margin: 10,
  [theme.breakpoints.up("lg")]: {
    ...(!open && {
      width: sizeSmall,
      height: sizeSmall,
    }),
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    height: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    background: "transparent",
    border: "none",
    width: drawerOpen,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("lg")]: {
      ...(!open && {
        width: drawerClose,
      }),
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    marginRight: 110,
    marginBottom: 15,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function MenuContent(props) {
  const { open, isscroll } = props;

  const { pathname } = useLocation();
  const location = pathname.replace("/", "");

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (location === "orders") {
      setSelectedIndex(1);
    } else if (location === "customers") {
      setSelectedIndex(2);
    } else if (location === "report") {
      setSelectedIndex(3);
    } else if (location === "integration") {
      setSelectedIndex(4);
    } else if (location === "users") {
      setSelectedIndex(5);
    } else {
      setSelectedIndex(0);
    }
  }, [location]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const mainListItems = (
    <React.Fragment>
      <LinkItemMenu
        icon={<DashboardIcon />}
        title="Dashboard"
        path="/dashboard"
        selected={selectedIndex === 0}
        onclick={(event) => handleListItemClick(event, 0)}
      />
      <LinkItemMenu
        icon={<ShoppingCartIcon />}
        title="Orders"
        path="/orders"
        selected={selectedIndex === 1}
        onclick={(event) => handleListItemClick(event, 1)}
      />
      <LinkItemMenu
        icon={<PeopleIcon />}
        title="Customer"
        path="/customers"
        selected={selectedIndex === 2}
        onclick={(event) => handleListItemClick(event, 2)}
      />
      <LinkItemMenu
        icon={<BarChartIcon />}
        title="Report"
        path="/report"
        selected={selectedIndex === 3}
        onclick={(event) => handleListItemClick(event, 3)}
      />
      <LinkItemMenu
        icon={<LayersIcon />}
        title="Integrations"
        path="/integration"
        selected={selectedIndex === 4}
        onclick={(event) => handleListItemClick(event, 4)}
      />
    </React.Fragment>
  );

  const secondaryListItems = (
    <React.Fragment>
      <LinkItemMenu title="Menu Reports" disabled />
      <LinkItemMenu
        icon={<PersonIcon />}
        title="Users"
        path="/users"
        selected={selectedIndex === 5}
        onclick={(event) => handleListItemClick(event, 5)}
      />
      <LinkItemMenu icon={<AssignmentIcon />} title="Last quarter" />
      <LinkItemMenu icon={<AssignmentIcon />} title="Year-end sale" />
    </React.Fragment>
  );

  return (
    <Fragment>
      <DrawerInner open={open}>
        <DrawerHeader className="drawerheader">
          <MyBrand isscroll={isscroll ? "true" : undefined} className="brand" />
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <ProfileUser>
              <ImgUser
                open={open}
                className="imguser"
                src={PIC.imgUser}
                alt="img user"
              />
              <div className="titleUser">
                <h4>Jhon Sena</h4>
                <span>Administrator</span>
              </div>
            </ProfileUser>
          </StyledBadge>
        </DrawerHeader>
        <MenuContainer className="menuContainer">
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </MenuContainer>
      </DrawerInner>
    </Fragment>
  );
}

function Sidebar(props) {
  const { open, toggleDrawer, isScroll } = props;
  return (
    <Fragment>
      <Hidden lgDown>
        <Drawer variant="permanent" open={open}>
          <MenuContent open={open} isscroll={isScroll} />
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          anchor="left"
          open={!open}
          onOpen={toggleDrawer}
          onClose={toggleDrawer}
        >
          <MenuContent open={open} isscroll={isScroll} />
        </SwipeableDrawer>
      </Hidden>
    </Fragment>
  );
}

export default Sidebar;
