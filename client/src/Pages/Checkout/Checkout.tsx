import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { ActionFunctionArgs, useActionData, useSubmit } from "react-router-dom";
import {
  createRazorpayOrder,
  loadRazorpayScript,
  postCheckoutData,
  verifyRazorpayPayment,
} from "../../api";
import { CartContext } from "../../store/ShoppingCartContext";
import {
  ActionData,
  CartItem,
  CheckoutFormCartData,
  CheckoutFormData,
} from "../../types";
import {
  BillingDetails,
  PaymentDetails,
  ShippingInfo,
  Summary,
  ThankYou,
} from "./components";
import "./components/style.css";
import { formValidationSchema } from "./utils";

// Declare Razorpay global type
declare global {
  interface Window {
    Razorpay: any;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());

  // Handle payment success from Razorpay
  if (values.paymentSuccess === "true") {
    return { success: true, message: "Payment successful" } as ActionData;
  }

  const checkoutData: CheckoutFormData = {
    name: values.name as string,
    phoneNumber: values.phoneNumber as string,
    address: values.address as string,
    zip: values.zip as string,
    city: values.city as string,
    country: values.country as string,
    paymentMethod: values.paymentMethod as string,
    totalAmount: parseFloat(values.totalAmount as string),
    cartData: JSON.parse(values.cartData as string),
  };

  if (checkoutData.paymentMethod === "razorpay") {
    try {
      const data = await createRazorpayOrder(
        values.accessToken as string,
        checkoutData
      );
      if (data.success) {
        return {
          success: true,
          status: "order_created",
          isRazorpayOrder: true,
          orderData: data.order,
          checkoutData: checkoutData,
          accessToken: values.accessToken as string,
        };
      } else {
        return data;
      }
    } catch (error) {
      return { success: false, error: "Failed to create Razorpay order" };
    }
  } else {
    return await postCheckoutData(values.accessToken as string, checkoutData);
  }
}

const initialFormValues: CheckoutFormData = {
  name: "",
  phoneNumber: "",
  address: "",
  zip: "",
  city: "",
  country: "",
  paymentMethod: "razorpay",
  totalAmount: 0,
  cartData: [],
};

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const submit = useSubmit();
  const actionData = useActionData() as ActionData & {
    isRazorpayOrder?: boolean;
    orderData?: any;
    checkoutData?: CheckoutFormData;
    accessToken?: string;
  };

  const showThankYou =
    actionData?.message === "Payment successful" ||
    actionData?.message === "Order placed successfully";
  const {
    cartData: state,
    onRemoveAllItems,
    onToggleCart,
  } = useContext(CartContext);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    if (showThankYou) {
      onToggleCart();
      onRemoveAllItems(true, false);
    }
  }, [showThankYou]);
  useEffect(() => {
    document.querySelector("body")!.style.overflow = "auto";
  });

  useEffect(() => {
    if (actionData?.isRazorpayOrder && actionData.orderData) {
      handleRazorpayPayment(actionData.orderData, actionData.checkoutData);
    }
    if (!actionData?.success) {
      setIsProcessing(false);
    }
  }, [actionData]);

  const handleRazorpayPayment = async (order: any, checkoutData: any) => {
    const accessToken = await getAccessTokenSilently();
    const res = await loadRazorpayScript();
    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      setIsProcessing(false);
      return;
    }

    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Audiophile",
        description: "Purchase from Audiophile Store",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const result = await verifyRazorpayPayment(
              accessToken,
              response,
              checkoutData
            );
            if (result.success) {
              onRemoveAllItems(true, false);
              onToggleCart();
              const formData = new FormData();
              formData.append("paymentSuccess", "true");
              formData.append("accessToken", accessToken);
              submit(formData, { method: "post" });
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please try again.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${checkoutData.name}`,
          email: checkoutData.email,
          contact: checkoutData.phoneNumber,
        },
        theme: {
          color: "#D87D4A",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const formik = useFormik<CheckoutFormData>({
    initialValues: initialFormValues,
    validationSchema: formValidationSchema,

    onSubmit: async (values) => {
      setIsProcessing(true);

      const cartData = state.items.map((item: CartItem) => ({
        slug: item.slug,
        name: item.name,
        price: item.price,
        quantity: item.count,
      })) as CheckoutFormCartData[];

      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("totalAmount", state.total.toString());
        formData.append("cartData", JSON.stringify(cartData));
        const accessToken = await getAccessTokenSilently();
        formData.append("accessToken", accessToken);

        submit(formData, { method: "post" });
      } catch (error) {
        console.error("Order error:", error);
        setIsProcessing(false);
        alert("Order failed. Please try again.");
      }
    },
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
              <Summary
                key={showThankYou?.toString()}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </form>
      </div>
      {showThankYou && <ThankYou showModal={showThankYou} />}
    </div>
  );
};

export default Checkout;
