import React from "react";
import { Outlet } from "react-router-dom";
import { Description, ItemsList } from "../components";

const ProductListLayout = () => {
  return (
    <>
      <Outlet/>
      <div className="flex justify-center items-center px-6 sm:px-16">
        <div className="w-full xl:max-w-[1100px]">
          <ItemsList />
          <Description />
        </div>
      </div>
    </>
  );
};

export default ProductListLayout;
