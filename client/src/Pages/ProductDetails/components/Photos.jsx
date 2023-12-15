import React from "react";

const Photos = ({ data }) => {
  const { first, second, third } = data.gallery;
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6">
      <div className=" flex flex-col gap-6">
        <div className="flex-1">
          <img src={first.mobile} alt="" className="block sm:hidden rounded-lg" />
          <img
            src={first.tablet}
            alt=""
            className="hidden sm:block lg:hidden rounded-lg"
          />
          <img
            src={first.desktop}
            alt=""
            className="hidden lg:block rounded-lg"
          />
        </div>
        <div className="">
          <img src={second.mobile} alt="" className="block sm:hidden rounded-lg" />
          <img
            src={second.tablet}
            alt=""
            className="hidden sm:block lg:hidden rounded-lg"
          />
          <img
            src={second.desktop}
            alt=""
            className="hidden lg:block rounded-lg"
          />
        </div>
      </div>
      <div className="">
        <img src={third.mobile} alt="" className="block sm:hidden rounded-lg" />
        <img src={third.tablet} alt="" className="hidden sm:block lg:hidden rounded-lg" />
        <img
          src={third.desktop}
          alt=""
          className="hidden lg:block rounded-lg"
        />
      </div>
    </div>
  );
};

export default Photos;
