import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <section className="bg-primary flex justify-center items-start px-6 sm:px-16 min-h-[100vh]">
      <div className="w-full xl:max-w-[1280px] flex justify-center mt-[150px]">
        <div className="font-inter text-[#161616] font-medium">
          <h1 className="font-semibold text-3xl">A Error has occured</h1>
          <p className="text-2xl">Message: {error.message}</p>
          <p className="text-xl">Status : {error.status}</p>
        </div>
      </div>
    </section>
  );
};

export default Error;