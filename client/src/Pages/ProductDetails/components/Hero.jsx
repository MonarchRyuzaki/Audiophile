import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useRef } from "react";
import { Link, } from "react-router-dom";
import { CartContext } from "../../../store/ShoppingCartContext";

const Hero = ({ data }) => {
  const { onAddToCart } = useContext(CartContext);
  const itemCountRef = useRef();
  function handleChange(qty) {
    if (parseInt(itemCountRef.current.value) + qty < 1) return;
    itemCountRef.current.value = parseInt(itemCountRef.current.value) + qty;
  }
  const handleClick = async () => {
    console.log("onClick");
    if (itemCountRef.current.value < 1) return;
    const item = {
      slug: data.slug,
      name: data.name,
      count: itemCountRef.current.value,
      image: data.categoryImage.mobile,
      category: data.category,
      price: data.price,
    };  
    onAddToCart(item);
  }
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return (
    <>
      <Link
        to={`/${data.category}`}
        className="block text-black hover:underline mt-20 mb-16"
      >
        Go Back
      </Link>
      <div
        className={`flex flex-col lg:flex-row justify-center items-center gap-16`}
        key={data.id}
      >
        <img
          src={data.categoryImage.mobile}
          alt=""
          className="block sm:hidden"
        />
        <img
          src={data.categoryImage.tablet}
          alt=""
          className="hidden sm:block lg:hidden"
        />
        <img
          src={data.categoryImage.desktop}
          alt=""
          className="hidden lg:block w-[500px]"
        />
        <div className="flex flex-1 flex-col justify-center">
          <div>
            {data.new && (
              <h2 className="text-orange tracking-[.625rem] mb-4">
                NEW PRODUCT
              </h2>
            )}
            <h2 className="text-5xl text-black font-semibold uppercase leading-[60px]">
              {data.name} <br /> {data.category}
              
            </h2>
            <div className="text-dimGray text-lg my-9">{data.description}</div>
            <div className="text-2xl font-semibold my-4">$ {data.price}</div>
            <div className="flex mt-4 gap-4">
              <div className="bg-lightGray px-4  flex justify-center items-center">
                <span
                  className="text-[35px] text-dimGray cursor-pointer"
                  onClick = {() => handleChange(-1)}
                >
                  -
                </span>
                <input
                  type="number"
                  name="count"
                  id="itemCount"
                  className="w-[60px] ml-4 text-center bg-lightGray"
                  min={1}
                  defaultValue={1}
                  ref = {itemCountRef}
                />
                <span
                  className="text-[35px] text-dimGray cursor-pointer"
                  onClick = {() => handleChange(1)}
                >
                  +
                </span>
              </div>
              {isAuthenticated ? (
                <button
                  className={`uppercase bg-orange text-primary text-[.8125rem] px-8 py-4 hover:opacity-[89%] transition duration-300 ease-in-out`}
                  type="submit"
                  onClick={handleClick}
                >
                  ADD TO CART
                </button>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className={`uppercase bg-orange text-primary text-[.8125rem] px-8 py-4 hover:opacity-[89%] transition duration-300 ease-in-out`}
                  type="submit"
                >
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
