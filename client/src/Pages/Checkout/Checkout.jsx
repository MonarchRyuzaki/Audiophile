import React from "react";
import { Form, Link } from "react-router-dom";
import {
  BillingDetails,
  PaymentDetails,
  ShippingInfo,
  Summary,
} from "./components";
import "./components/style.css";

const Checkout = () => {
  const data = JSON.parse(localStorage.getItem("itemInfo")) || [];
  const summaryHeight = `${data.length * 90 + 350}px`;
  return (
    <div className="bg-lightGray min-h-[100vh] flex justify-center items-start px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        <div>
          <Link
            to=".."
            path="relative"
            className="block text-black hover:underline mt-20 mb-10"
          >
            Go Back
          </Link>
        </div>
        <Form>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3 bg-white px-10 py-16 mb-20">
              <h1 className="font-bold uppercase text-3xl tracking-wider">
                Checkout
              </h1>
              <div className="flex flex-col">
                <BillingDetails />
                <ShippingInfo />
                <PaymentDetails />
              </div>
            </div>
            <div
              className={`bg-white px-10 py-10 w-full lg:w-1/3`}
              style={{ height: summaryHeight }}
            >
              <Summary />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
