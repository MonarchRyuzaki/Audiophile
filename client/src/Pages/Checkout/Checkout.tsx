import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { ActionFunctionArgs, useActionData, useSubmit } from "react-router-dom";
import { postCheckoutData } from "../../api";
import { CartContext } from "../../store/ShoppingCartContext";
import { ActionData, CheckoutFormData } from "../../types";
import {
  BillingDetails,
  PaymentDetails,
  ShippingInfo,
  Summary,
  ThankYou,
} from "./components";
import "./components/style.css";
import { formValidationSchema } from "./utils";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  const checkoutData: CheckoutFormData = {
    name: values.name as string,
    email: values.email as string,
    phoneNumber: values.phoneNumber as string,
    address: values.address as string,
    zip: values.zip as string,
    city: values.city as string,
    country: values.country as string,
    eMoneyNumber: values.eMoneyNumber as string,
    eMoneyPIN: values.eMoneyPIN as string,
    paymentMethod: values.paymentMethod as string,
  };
  return await postCheckoutData(checkoutData);
}

const initialFormValues: CheckoutFormData = {
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
};

const Checkout = () => {
  const submit = useSubmit();
  const actionData = useActionData() as ActionData;
  const showThankYou = actionData?.success;
  const { onRemoveAllItems, onToggleCart } = useContext(CartContext);

  useEffect(() => {
    document.querySelector("body")!.style.overflow = "auto";
  });

  const formik = useFormik<CheckoutFormData>({
    initialValues: initialFormValues,

    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      submit(formData, { method: "post" });
      onToggleCart();
      onRemoveAllItems(true, false);
    },
    validationSchema: formValidationSchema,
  });
  const goBack = () => {
    window.history.back();
  };
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
              className={`bg-white h-fit px-10 py-10 w-full lg:w-1/3 mb-20 lg:mb-0`}
            >
              <Summary key={showThankYou?.toString()} />
            </div>
          </div>
        </form>
      </div>
      {showThankYou && <ThankYou showModal={showThankYou} />}
    </div>
  );
};

export default Checkout;
