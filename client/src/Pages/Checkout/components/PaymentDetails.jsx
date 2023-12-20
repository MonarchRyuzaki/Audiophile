import React, { useState } from "react";

const PaymentDetails = ({ formik }) => {
  const paymentMethod = formik.values.paymentMethod;
  return (
    <div>
      <div className="uppercase font-bold text-sm tracking-wide text-orange my-6">
        Payment Details
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="text-sm font-bold text-black sm:w-1/2">
          Payment Method
        </div>
        <div className="flex flex-col  sm:w-1/2 gap-2">
          <div
            className={`border-2  px-6 py-3 rounded-lg flex flex-row items-center focus:border-orange focus:ring-orange ${
              paymentMethod === "eMoney" ? "border-orange" : "border-lightGray"
            }`}
          >
            <input
              type="radio"
              id="eMoney"
              name="paymentMethod"
              value="eMoney"
              checked={paymentMethod === "eMoney"}
              onChange={() => 
                formik.setFieldValue("paymentMethod", "eMoney")
              }
              className="mr-4 scale-[1.5] "
            />
            <label htmlFor="eMoney" className="mr-4 font-semibold  w-full">
              e-Money
            </label>
          </div>

          <div
            className={`border-2  px-6 py-3 rounded-lg flex flex-row items-center  focus:border-orange focus:ring-orange ${
              paymentMethod === "cashOnDelivery"
                ? "border-orange"
                : "border-lightGray"
            }`}
          >
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={() =>
                formik.setFieldValue("paymentMethod", "cashOnDelivery")
              }
              className="mr-4 scale-[1.5]"
            />
            <label
              htmlFor="cashOnDelivery"
              className="mr-4 font-semibold w-full"
            >
              Cash on Delivery
            </label>
          </div>
        </div>
      </div>
      {paymentMethod === "eMoney" && (
        <div className="flex flex-col sm:flex-row sm:gap-4 mt-4">
          <div className="w-full">
            <label
              htmlFor="eMoneyNumber"
              className="text-sm font-bold text-black flex justify-between my-2"
            >
              <div
                className={`${
                  formik.errors.eMoneyNumber &&
                  formik.touched.eMoneyNumber &&
                  "text-red-500"
                }`}
              >
                e-Money Number
              </div>
              {formik.errors.eMoneyNumber && formik.touched.eMoneyNumber && (
                <div className="text-red-500">{formik.errors.eMoneyNumber}</div>
              )}
            </label>
            <input
              type="text"
              name="eMoneyNumber"
              id="eMoneyNumber"
              placeholder="2388521993"
              className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
                formik.errors.eMoneyNumber && formik.touched.eMoneyNumber
                  ? "border-red-500"
                  : "border-lightGray"
              }`}
              onChange={formik.handleChange}
              value={formik.values.eMoneyNumber}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="eMoneyPIN"
              className="text-sm font-bold text-black flex justify-between my-2"
            >
              <div
                className={`${
                  formik.errors.eMoneyPIN &&
                  formik.touched.eMoneyPIN &&
                  "text-red-500"
                }`}
              >
                e-Money PIN
              </div>
              {formik.errors.eMoneyPIN && formik.touched.eMoneyPIN && (
                <div className="text-red-500">{formik.errors.eMoneyPIN}</div>
              )}
            </label>
            <input
              type="text"
              name="eMoneyPIN"
              id="eMoneyPIN"
              placeholder="6891"
              className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
                formik.errors.eMoneyPIN && formik.touched.eMoneyPIN
                  ? "border-red-500"
                  : "border-lightGray"
              }`}
              onChange={formik.handleChange}
              value={formik.values.eMoneyPIN}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
      )}
      {paymentMethod === "cashOnDelivery" && (
        <div className="flex flex-row sm:gap-4 mt-4">
          <img src="/assets/cart/cod.svg" className="" alt="" />
          <div className="text-dimGray">
            The ‘Cash on Delivery’ option enables you to pay in cash when our
            delivery courier arrives at your residence. Just make sure your
            address is correct so that your order will not be cancelled.
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
