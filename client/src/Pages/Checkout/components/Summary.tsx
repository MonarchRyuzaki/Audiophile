import { useContext } from "react";
import { useActionData, useNavigation } from "react-router-dom";
import { CartContext } from "../../../store/ShoppingCartContext";
import { ActionData, CartItem } from "../../../types";
import FormErrorDetails from "./FormErrorDetails";

const Summary = () => {
  const { cartData } = useContext(CartContext);
  const actionData = useActionData() as ActionData;
  const data = cartData.items;
  const total = cartData.total;
  const vat = Math.round(0.2 * total);
  const shipping = data.length > 0 ? 50 : 0;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const buttonText = data.length === 0 ? "Cart is Empty" : "Place Order";
  return (
    <div className="flex flex-col">
      <h1 className="font-bold uppercase text-xl tracking-wider mb-5">
        Summary
      </h1>
      <div className="flex flex-col gap-6">
        {data.length === 0 ? (
          <div className="text-center tracking-wider text-md text-dimGray">
            Your Cart is Empty
          </div>
        ) : (
          data.map((item: CartItem) => (
            <div key={item.slug} className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <img src={item.image} alt="" className="w-[75px]" />
                <div className="flex flex-col uppercase text-md font-semibold">
                  <div>{item.name}</div>
                  <div className="text-dimGray">${item.price}</div>
                </div>
              </div>
              <div className="text-dimGray text-sm">x{item.count}</div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between mt-6">
        <div className="uppercase text-dimGray tracking-wide">TOTAL</div>
        <div className="font-bold text-lg">${total}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="uppercase text-dimGray tracking-wide">SHIPPING</div>
        <div className="font-bold text-lg">${shipping}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="uppercase text-dimGray tracking-wide">
          VAT(INCLUDED)
        </div>
        <div className="font-bold text-lg">${vat}</div>
      </div>
      <div className="flex justify-between mt-6">
        <div className="uppercase text-dimGray tracking-wide">GRAND TOTAL</div>
        <div className="font-bold text-lg text-orange">
          ${vat + total + shipping}
        </div>
      </div>
      <button
        className={`bg-orange ${
          isSubmitting || data.length === 0 ? "opacity-80" : ""
        } w-full mt-4 uppercase text-primary tracking-wide font-semibold text-md py-3 hover:bg-opacity-80`}
        type="submit"
        disabled={data.length === 0 || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : buttonText}
      </button>
      {actionData?.success === false && <FormErrorDetails />}
    </div>
  );
};

export default Summary;
