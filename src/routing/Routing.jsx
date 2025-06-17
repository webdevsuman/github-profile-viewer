import React from "react";
import { Routes, Route } from "react-router-dom";
import Error404 from "../pages/Error404";
import HomePg from "../pages/HomePg";
import UserPage from "../pages/UserPage";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePg />} />
        <Route path="/users/:id/:username" element={<UserPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
