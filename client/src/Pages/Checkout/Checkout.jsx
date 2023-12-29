import { useFormik } from "formik";
import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import {
  BillingDetails,
  PaymentDetails,
  ShippingInfo,
  Summary,
  ThankYou,} from "./components";
import "./components/style.css";
import { useOutletContext } from "react-router-dom";

const Checkout = () => {
  const [submit, setSubmit] = useState("false");
  const {setNoOfItems} = useOutletContext();
  useEffect(() => {
    document.querySelector('body').style.overflow="auto"
  })
  // Formik Logic
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      eMoneyNumber: "",
      eMoneyPIN: "",
      paymentMethod: "eMoney",
    },

    onSubmit: () => {
      setSubmit("true");
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .min(12, "Invalid Phone Number")
        .max(14, "Invalid Phone Number")
        .required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      zip: Yup.number().required("Zip Code is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      eMoneyNumber: Yup.string().when("paymentMethod", {
        is: "eMoney",
        then: () => Yup.string()
          .required("Field is required")
          .length(12, "Invalid E-Money Number"),
        otherwise: () => Yup.string(),
      }),
      eMoneyPIN: Yup.string().when("paymentMethod", {
        is: "eMoney",
        then: () => Yup.string()
          .required("Field is required")
          .length(4, "Invalid E-Money PIN"),
        otherwise: () => Yup.string(),
      }),
      paymentMethod: Yup.string().required("Payment mode is required"),
    }),
  });
  const goBack = () => {
    window.history.back();
  };
  const data = JSON.parse(localStorage.getItem("itemInfo")) || [];
  const summaryHeight = `${data.length * 90 + 370}px`;
  return (
    <div className="bg-lightGray min-h-[100vh] flex justify-center items-start px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        <div>
          <div
            onClick={goBack}
            className="block text-black hover:underline mt-20 mb-10"
          >
            Go Back
          </div>
        </div>
        <form method="post" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3 bg-white px-10 py-16 mb-10 lg:mb-20">
              <h1 className="font-bold uppercase text-3xl tracking-wider">
                Checkout
              </h1>

              <div className="flex flex-col">
                <BillingDetails formik={formik} />
                <ShippingInfo formik={formik} />
                <PaymentDetails formik={formik} />
              </div>
            </div>
            <div
              className={`bg-white px-10 py-10 w-full lg:w-1/3 mb-20 lg:mb-0`}
              style={{ height: summaryHeight }}
            >
              <Summary formik={formik} />
            </div>
          </div>
        </form>
      </div>
      {submit === "true" && <ThankYou setNoOfItems={setNoOfItems}/>}
      {/* <ThankYou  setNoOfItems={setNoOfItems}/> */}
    </div>
  );
};

export default Checkout;
