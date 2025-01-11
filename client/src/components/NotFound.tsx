import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-primary min-h-[100vh] flex justify-center items-start px-6 sm:px-16">
      <div className="w-full xl:max-w-[1280px] text-center mt-[200px] flex items-center justify-center flex-col">
        <h1 className="text-[#161616] font-inter font-bold text-5xl leading-[60px] mb-6">
          Sorry, the page you were looking for was not found.
        </h1>
        <Link to="/" className="w-full max-w-[450px]">
          <div className="bg-[#161616] text-white px-6 py-2 font-bold">
            Return to home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
