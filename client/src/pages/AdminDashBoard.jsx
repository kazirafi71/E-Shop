import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminDashboardhead from "../components/AdminDashboardhead";
import SidebarAdmin from "../components/SidebarAdmin";
import AddCategory from "./AddCategory";
import ViewOrders from "./ViewOrders";

const AdminDashBoard = () => {
  return (
    <div>
        
      <div className="">
        <div className="row">
          <div className="col-2 ">
            <SidebarAdmin/>
          </div>
         
          <div className="col-10 ">
            <AdminDashboardhead/>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashBoard;
