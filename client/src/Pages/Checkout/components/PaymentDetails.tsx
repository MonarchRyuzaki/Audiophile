import { FormikProps } from "formik";
import { CheckoutFormData } from "../../../types";

const PaymentDetails = ({
  formik,
}: {
  formik: FormikProps<CheckoutFormData>;
}) => {
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
            className={`border-2 px-6 py-3 rounded-lg flex flex-row items-center focus:border-orange focus:ring-orange ${
              paymentMethod === "razorpay"
                ? "border-orange"
                : "border-lightGray"
            }`}
          >
            <input
              type="radio"
              id="razorpay"
              name="paymentMethod"
              value="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={() => formik.setFieldValue("paymentMethod", "razorpay")}
              className="mr-4 scale-[1.5]"
            />
            <label htmlFor="razorpay" className="mr-4 font-semibold w-full">
              Pay Online (Card/UPI/Wallet)
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
      {paymentMethod === "cashOnDelivery" && (
        <div className="flex flex-row gap-4 mt-4">
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
