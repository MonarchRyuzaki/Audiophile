import React from "react";

const ProductHeader = ({ title }) => {
  return (
    <div className="bg-black flex justify-center items-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        <div className="text-center text-primary text-5xl py-20 tracking-wider">{title}</div>
      </div>
    </div>
  );
};

export default ProductHeader;
