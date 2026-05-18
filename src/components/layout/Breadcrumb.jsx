import styled from "@emotion/styled";
import { Breadcrumbs, Chip, alpha } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const useStyles = (theme) => ({
  active: {
    backgroundColor: alpha("#aaa", 0.3),
  },
  fontItem: {
    color: "#fafafa",
  },
});

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = alpha(theme.palette.grey[900], 0.4);
  return {
    backgroundColor,
    height: theme.spacing(2.5),
    color: "#fafafa",
    fontSize: "8px",
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: alpha(theme.palette.grey[800], 0.3),
    },
  };
});

function Breadcrumb() {
  const { pathname } = useLocation();
  const location = pathname.replace("/", "");

  const classes = useStyles();

  const itemOrders = [
    {
      key: "1",
      title: "Orders",
      clickable: false,
      active: classes.active,
    },
  ];

  const itemCustomers = [
    {
      key: "1",
      title: (
        <NavLink to="/customers" style={classes.fontItem}>
          Customers
        </NavLink>
      ),
      clickable: true,
      active: {},
    },
    {
      key: "2",
      title: "Add Customers",
      clickable: false,
      active: classes.active,
    },
  ];

  const itemReport = [
    {
      key: "1",
      title: "Report",
      clickable: false,
      active: classes.active,
    },
  ];

  const itemIntegration = [
    {
      key: "1",
      title: "Integration",
      clickable: false,
      active: classes.active,
    },
  ];

  const itemUsers = [
    {
      key: "1",
      title: "Users",
      clickable: false,
      active: classes.active,
    },
  ];

  return (
    <div>
      {location !== "dashboard" && location !== "" ? (
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{ pb: 3, pl: 2 }}
        >
          <StyledBreadcrumb
            label={
              <NavLink to="/" style={classes.fontItem}>
                Home
              </NavLink>
            }
            icon={<HomeIcon color="inherit" fontSize="inherit" />}
            clickable
          />
          {location === "orders" &&
            itemOrders.map((item) => (
              <StyledBreadcrumb
                key={item.key}
                label={item.title}
                clickable={item.clickable}
                style={item.active}
              />
            ))}
          {location === "customers" &&
            itemCustomers.map((item) => (
              <StyledBreadcrumb
                key={item.key}
                label={item.title}
                clickable={item.clickable}
                style={item.active}
              />
            ))}
          {location === "report" &&
            itemReport.map((item) => (
              <StyledBreadcrumb
                key={item.key}
                label={item.title}
                clickable={item.clickable}
                style={item.active}
              />
            ))}
          {location === "integration" &&
            itemIntegration.map((item) => (
              <StyledBreadcrumb
                key={item.key}
                label={item.title}
                clickable={item.clickable}
                style={item.active}
              />
            ))}
          {location === "users" &&
            itemUsers.map((item) => (
              <StyledBreadcrumb
                key={item.key}
                label={item.title}
                clickable={item.clickable}
                style={item.active}
              />
            ))}
        </Breadcrumbs>
      ) : (
        <br />
      )}
    </div>
  );
}

export default Breadcrumb;
