import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { ActionFunctionArgs, useNavigation, useSubmit } from "react-router-dom";
import * as Yup from "yup";
import { CartContext } from "../../store/ShoppingCartContext";
import {
  BillingDetails,
  PaymentDetails,
  ShippingInfo,
  Summary,
  ThankYou,
} from "./components";
import "./components/style.css";
import { formValidationSchema } from "./utils";
import { CheckoutFormData } from "../../types";
import { postCheckoutData } from "../../api";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  console.log(values);
  await postCheckoutData(values as CheckoutFormData);
}

const initialFormValues : CheckoutFormData = {
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
}

const Checkout = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    document.querySelector("body")!.style.overflow = "auto";
  });
  const { cartData } = useContext(CartContext);
  const { user } = useAuth0();
  const { name, email } = { ...user };
  // Formik Logic
  const formik = useFormik<CheckoutFormData>({
    initialValues: initialFormValues,

    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      submit(formData, { method: "post" });
    },
    validationSchema: formValidationSchema,
  });
  const goBack = () => {
    window.history.back();
  };
  const summaryHeight = `${cartData.items.length * 90 + 370}px`;
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
          {" "}
          {/* We are not using actions here so this is good for now but can be changed using action later*/}
          {/* We can also use useNavigation hook to disable button when form is submitting */}
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
              <Summary />
            </div>
          </div>
        </form>
      </div>
      {/* <ThankYou showModal={submit === "true"} setSubmit={setSubmit} /> */}
    </div>
  );
};

export default Checkout;
