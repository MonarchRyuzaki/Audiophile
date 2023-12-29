import React, { useEffect } from "react";
import { Draggable } from "react-draggable";
import { Link, useLoaderData } from "react-router-dom";

const ThankYou = ({ setNoOfItems }) => {
  const totalPrice =
    parseInt(JSON.parse(localStorage.getItem("totalPrice"))) || 0;
  const data = JSON.parse(localStorage.getItem("itemInfo"));
  // useEffect(() => {
  //   document.querySelector("body").style.overflow = "auto";
  // });
  return (
    // <Draggable>
      <div
        className="fixed z-[2] h-screen bg-[#10101066] w-full left-0 px-6 sm:px-16 flex justify-center items-start overflow-auto"
        id="test"
      >
        <div className="bg-white sm:w-[640px] w-full rounded-xl px-10 py-20 xs:p-14 my-6 md:my-12 lg:my-24 mb-28">
          <img src="/assets/cart/tick.svg" alt="" />
          <h3 className="text-4xl font-semibold leading-[50px] my-8">
            THANK YOU FOR YOUR ORDER
          </h3>
          <div className="text-dimGray">
            You will receive an email confirmation shortly.
          </div>
          <div className="flex justify-center flex-col items-center my-10 sm:flex-row">
            <div
              className={`bg-lightGray rounded-md ${
                data.length > 1 ? "py-[15.5px]" : "py-10"
              } px-4 flex-1 flex flex-col gap-3 w-full`}
            >
              <div className="flex justify-between lg:flex-row items-center gap-3">
                <img src={data[0].image.mobile} className="w-[60px]" alt="" />
                <div className="flex flex-col justify-center">
                  <div className="text-md font-semibold">{data[0].name}</div>
                  <div className="text-md font-semibold text-dimGray">
                    $ {data[0].price}
                  </div>
                </div>
                <div className="text-md font-semibold text-dimGray">
                  x{data[0].count}
                </div>
              </div>
              {data.length > 1 && (
                <>
                  <div className="text-md font-semibold text-center border-t-[1px] pt-3 border-t-dimGray text-dimGray">
                    +{data.length - 1} more item
                  </div>
                </>
              )}
            </div>
            <div className="bg-black rounded-md py-9 px-4 flex-1 w-full">
              <div className="text-gray mb-2 text-md ">GRAND TOTAL</div>
              <div className="text-primary mb-2 text-lg ">$ {totalPrice}</div>
            </div>
          </div>
          <Link
            to="/"
            className="bg-orange w-full block text-primary text-center py-4 mt-4 rounded-md font-semibold uppercase hover:bg-opacity-70"
            onClick={() => {
              // console.log("Button Click")
              localStorage.clear("getItem");
              localStorage.clear("totalPrice");
              setNoOfItems(0);
            }}
          >
            Confirm
          </Link>
        </div>
      </div>
    // </Draggable>
  );
};

export default ThankYou;
