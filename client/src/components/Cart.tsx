import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../store/ShoppingCartContext";

const Cart = ({
  isCartVisible,
  setIsCartVisible,
}: {
  isCartVisible: boolean;
  setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { cartData, onRemoveAllItems, onUpdateCartItemQuantity } =
    useContext(CartContext);

  useEffect(() => {
    if (isCartVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartVisible]);
  const renderData = () => {
    return cartData.items.map((item, index) => {
      return (
        <div key={index} className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={item.image} alt="" className="w-[50px] xs:w-[80px]" />
            <div className="flex flex-col uppercase text-md font-semibold">
              <div>{item.name}</div>
              <div className="text-dimGray">${item.price}</div>
            </div>
          </div>
          <div className="bg-lightGray px-4  flex justify-center items-center w-[80px] xs:w-[142px]">
            <span
              className="text-[35px] text-dimGray cursor-pointer"
              onClick={() => onUpdateCartItemQuantity(item, -1)}
            >
              -
            </span>
            <input
              title="itemCount"
              type="text"
              name="count"
              id="itemCount"
              className="w-[15px] xs:w-[60px] ml-2 xs:ml-4 text-center bg-lightGray"
              min={1}
              value={item.count}
              readOnly
            />
            <span
              className="text-[35px] text-dimGray cursor-pointer"
              onClick={() => onUpdateCartItemQuantity(item, 1)}
            >
              +
            </span>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="fixed z-[2] top-[5.625rem] min-h-[100vh] bg-[#10101066] w-full left-0 px-6 sm:px-16 flex justify-center">
      <div className="xl:max-w-[1100px] w-full">
        <div
          className={`flex justify-end items-start mt-6 ${
            isCartVisible ? "z-50" : ""
          }`}
        >
          <div className="w-full sm:max-w-[450px]">
            <div className="bg-primary w-full rounded-xl p-8">
              <div className="flex justify-between">
                <h3 className="font-semibold uppercase">
                  Cart ({cartData.items.length})
                </h3>
                <button
                  className="font-normal text-sm underline"
                  onClick={() => onRemoveAllItems(true)}
                >
                  Remove All
                </button>
              </div>
              <div className="flex flex-col gap-6 mt-4 lg:overflow-auto h-[300px] relative">
                {cartData.items.length == 0 && (
                  <div className="flex text-center items-center h-screen justify-center tracking-wider text-md text-dimGray">
                    <div>Your Cart is Empty</div>
                  </div>
                )}

                {renderData()}
              </div>
              <div className="flex justify-between mt-6 ">
                <div className="uppercase text-dimGray tracking-wider">
                  TOTAL
                </div>
                <div className="font-semibold">${cartData.total}</div>
              </div>
              <Link to="/checkout" onClick={() => setIsCartVisible(false)}>
                <button className="bg-orange w-full mt-3 uppercase text-primary tracking-wider py-3">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
