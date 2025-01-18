import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../store/ShoppingCartContext";

function ThankYou({ showModal }: { showModal: boolean }) {
  const { cartData, onRemoveAllItems, onToggleCart } = useContext(CartContext);
  const vat = Math.round(0.2 * cartData.total);
  const shipping = cartData.items.length > 0 ? 50 : 0;
  const navigate = useNavigate();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (showModal) {
      ref.current!.showModal();
    } else {
      ref.current!.close();
    }
  }, [showModal]);
  const handleConfirm = () => {
    onToggleCart();
    onRemoveAllItems(false, true);
    navigate("/");
  };
  return createPortal(
    <dialog
      ref={ref}
      className="fixed z-10 bg-white rounded-xl p-8 max-w-2xl w-full shadow-xl"
      id="orderConfirmation"
    >
      <div className="bg-white w-full rounded-xl p-4">
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
              cartData.items.length > 1 ? "py-[15.5px]" : "py-10"
            } px-4 flex-1 flex flex-col gap-3 w-full`}
          >
            <div className="flex justify-between lg:flex-row items-center gap-3">
              <img src={cartData.items[0].image} className="w-[60px]" alt="" />
              <div className="flex flex-col justify-center">
                <div className="text-md font-semibold">
                  {cartData.items[0].name}
                </div>
                <div className="text-md font-semibold text-dimGray">
                  $ {cartData.items[0].price}
                </div>
              </div>
              <div className="text-md font-semibold text-dimGray">
                x{cartData.items[0].count}
              </div>
            </div>
            {cartData.items.length > 1 && (
              <>
                <div className="text-md font-semibold text-center border-t-[1px] pt-3 border-t-dimGray text-dimGray">
                  +{cartData.items.length - 1} more item
                </div>
              </>
            )}
          </div>
          <div className="bg-black rounded-md py-9 px-4 flex-1 w-full">
            <div className="text-gray mb-2 text-md ">GRAND TOTAL</div>
            <div className="text-primary mb-2 text-lg ">
              $ {cartData.total + shipping + vat}
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="bg-orange w-full block text-primary text-center py-4 mt-4 rounded-md font-semibold uppercase hover:bg-opacity-70"
          onClick={handleConfirm}
        >
          Confirm
        </Link>
      </div>
    </dialog>,
    document.querySelector("#modal-root")!
  );
}

export default ThankYou;
