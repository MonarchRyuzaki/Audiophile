import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ noOfItems, setNoOfItems, isCartVisible, setIsCardVisible }) => {
  const data = JSON.parse(localStorage.getItem("itemInfo")) || [];
  const totalPrice = data.reduce((sum, item) => {
    // Assuming the price property is a string, convert it to a number
    const itemPrice = parseInt(item.price) * parseInt(item.count) || 0;

    // Add the current item's price to the sum
    return sum + itemPrice;
  }, 0);
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  console.log(data);
  const [total, setTotal] = useState(totalPrice);
  const handleClick = () => {
    localStorage.clear("itemInfo");
    setNoOfItems(0);
    setTotal(0);
    setIsCardVisible(false);
  };
  useEffect(() => {
    if (setIsCardVisible) {
      document.body.style.overlow = "hidden";
    } else {
      document.body.style.overlow = "auto";
    }
  }, [isCartVisible]);
  const renderData = () => {
    return data.map((item, index) => {
      const handleIncrease = () => {
        item.count = parseInt(item.count) + 1;
        setTotal((curr) => curr + parseInt(item.price));
        localStorage.setItem(
          "totalPrice",
          JSON.stringify(totalPrice + parseInt(item.count))
        );
        localStorage.setItem("itemInfo", JSON.stringify(data));
      };
      const handleDecrease = () => {
        if (parseInt(item.count) > 0) {
          item.count = parseInt(item.count) - 1;
          setTotal((curr) => curr - parseInt(item.price));
          localStorage.setItem(
            "totalPrice",
            JSON.stringify(totalPrice - parseInt(item.count))
          );
          localStorage.setItem("itemInfo", JSON.stringify(data));
        }
      };
      const handleChange = (e) => {
        const { value } = e.target;
        setCnt(parseInt(value));
        item.count = parseInt(item.count);
        localStorage.setItem("itemInfo", JSON.stringify(data));
      };
      return (
        <div key={index} className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={item.image.mobile} alt="" className="w-[80px]" />
            <div className="flex flex-col uppercase text-md font-semibold">
              <div>{item.name}</div>
              <div className="text-dimGray">${item.price}</div>
            </div>
          </div>
          <div className="bg-lightGray px-4  flex justify-center items-center">
            <span
              className="text-[35px] text-dimGray cursor-pointer"
              onClick={handleDecrease}
            >
              -
            </span>
            <input
              type="text"
              name="count"
              id="itemCount"
              className="w-[60px] ml-4 text-center bg-lightGray"
              min={1}
              value={item.count}
              onChange={handleChange}
              readOnly
            />
            <span
              className="text-[35px] text-dimGray cursor-pointer"
              onClick={handleIncrease}
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
                <h3 className="font-semibold uppercase">Cart ({noOfItems})</h3>
                <button
                  className="font-normal text-sm underline"
                  onClick={handleClick}
                >
                  Remove All
                </button>
              </div>
              <div className="flex flex-col gap-6 mt-4 lg:overflow-auto h-[300px] relative">
                {data.length == 0 && (
                  <div className="flex text-center absolute top-[50%] left-[31%] tracking-wider text-md text-dimGray">
                    Your Cart is Empty
                  </div>
                )}

                {renderData()}
              </div>
              <div className="flex justify-between mt-6 ">
                <div className="uppercase text-dimGray tracking-wider">
                  TOTAL
                </div>
                <div className="font-semibold">${total}</div>
              </div>
              <Link to="/checkout" onClick={() => setIsCardVisible(false)}>
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
