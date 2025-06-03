import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { ActionFunctionArgs, useActionData, useSubmit } from "react-router-dom";
import { postCheckoutData } from "../../api";
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
  const checkoutData: CheckoutFormData = {
    name: values.name as string,
    phoneNumber: values.phoneNumber as string,
    address: values.address as string,
    zip: values.zip as string,
    city: values.city as string,
    country: values.country as string,
    eMoneyNumber: values.eMoneyNumber as string,
    eMoneyPIN: values.eMoneyPIN as string,
    paymentMethod: values.paymentMethod as string,
    totalAmount: parseFloat(values.totalAmount as string),
    cartData: JSON.parse(values.cartData as string),
  };
  return await postCheckoutData(values.accessToken as string, checkoutData);
}

const initialFormValues: CheckoutFormData = {
  name: "",
  phoneNumber: "",
  address: "",
  zip: "",
  city: "",
  country: "",
  eMoneyNumber: "",
  eMoneyPIN: "",
  paymentMethod: "razorpay", // Changed default to razorpay
  totalAmount: 0,
  cartData: [],
};

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const submit = useSubmit();
  const actionData = useActionData() as ActionData;
  const showThankYou = actionData?.success || orderPlaced;
  const {
    cartData: state,
    onRemoveAllItems,
    onToggleCart,
  } = useContext(CartContext);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    document.querySelector("body")!.style.overflow = "auto";
  });

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async (orderData: any) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection."
      );
      setIsProcessing(false);
      return;
    }

    try {
      const accessToken = await getAccessTokenSilently();

      // Create Razorpay order
      const response = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: 1,
          currency: "INR",
          orderData: orderData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Audiophile",
        description: "Purchase from Audiophile Store",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment on server
            const verifyResponse = await fetch("http://localhost:8080/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: orderData,
              }),
            });

            const result = await verifyResponse.json();

            if (result.success) {
              setOrderPlaced(true);
              onRemoveAllItems(true, false);
              onToggleCart();
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
          name: `${orderData.name}`,
          email: orderData.email,
          contact: orderData.phoneNumber,
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

      const orderData = {
        ...values,
        cartData: cartData,
        totalAmount: state.total,
              // shipping: state.shipping,
              // vat: state.vat,
              // grandTotal: state.grandTotal,
      };

      if (values.paymentMethod === "razorpay") {
        await handleRazorpayPayment(orderData);
      } else {
        // Handle existing payment methods (eMoney, Cash on Delivery)
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
          onToggleCart();
          onRemoveAllItems(true, false);
        } catch (error) {
          console.error("Order error:", error);
          alert("Order failed. Please try again.");
        } finally {
          setIsProcessing(false);
        }
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

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-8 text-white font-semibold tracking-wide uppercase transition-colors mt-8 ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange hover:bg-lightOrange"
                }`}
              >
                {isProcessing ? "Processing..." : "Continue & Pay"}
              </button>
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
