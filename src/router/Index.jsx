import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../components/layout/Main";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Order";
import Customers from "../pages/Customers";
import Report from "../pages/Report";
import DataGridTable from "../pages/DataGridTable";
import Login from "../pages/Login";
import Users from "../pages/Users";
import AuthProtected from "./AuthProtected";

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />}>
        <Route element={<AuthProtected />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/report" element={<Report />} />
          <Route path="/integration" element={<DataGridTable />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <div>
            <h2>404 Page Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default Router;
