import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";

const MainLayout = () => {
  return (
    <>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
