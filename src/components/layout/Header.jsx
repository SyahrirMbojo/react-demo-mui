import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar from "@mui/material/AppBar";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import PIC from "../../assets";
import Brand from "../Brand";
import { useNavigate } from "react-router-dom";
import MenuLists from "../MenuLists";

const drawerOpen = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, isscroll }) => ({
  position: "absolute",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none !important",
  ...(isscroll && {
    background: theme.palette.primary.dark,
    "&:after": {
      content: '""',
      left: `-${drawerOpen}px`,
      width: `calc(100% + ${drawerOpen}px)`,
      position: "absolute",
      bottom: -2,
      height: 1,
      background: "#000",
      filter: "blur(3px)",
    },
  }),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${drawerOpen}px)`,
    ...(!open && {
      width: "100%",
      "& .menuButton": {
        marginLeft: "-5px",
      },
    }),
  },
}));

const MenuButton = styled(IconButton)(({ theme, open }) => ({
  marginLeft: "-25px",
  transition: theme.transitions.create(["width", "margin", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down("lg")]: {
    marginLeft: "-10px",
  },
}));

const MyBrand = styled(Brand)(({ theme, open }) => ({
  marginLeft: 20,
  transition: theme.transitions.create(["width", "margin", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.up("lg")]: {
    ...(open && { display: "none" }),
  },
}));

function Header(props) {
  const { open, toggleDrawer, isScroll } = props;

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openaccountmenu = Boolean(anchorEl);

  const handleClickAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = (path) => {
    setAnchorEl(null);
    if (path === "login") {
      localStorage.clear();
    }
    navigate(path);
  };

  return (
    <>
      <AppBar open={open} isscroll={isScroll ? "true" : undefined}>
        <Toolbar>
          <MenuButton
            className="menuButton"
            color="inherit"
            aria-label="Menu"
            onClick={toggleDrawer}
          >
            {open ? <MenuOpenRoundedIcon /> : <MenuRoundedIcon />}
          </MenuButton>
          <MyBrand open={open} className="brand" />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClickAccountMenu}
                sx={{ p: 0.5 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  alt="profile"
                  src={PIC.imgUser}
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <MenuLists
        anchorEl={anchorEl}
        id="account-menu"
        open={openaccountmenu}
        onClick={handleCloseAccountMenu}
        onClose={handleCloseAccountMenu}
        arrowPosition="right"
      >
        <MenuItem onClick={handleCloseAccountMenu}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleCloseAccountMenu}>
          <Avatar /> My Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseAccountMenu}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleCloseAccountMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={(e) => handleCloseAccountMenu("login")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuLists>
    </>
  );
}

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Header;
