import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { addToCart } from "../../../api";

// idea: We can use a redirectTo search param to go to after doing something 
export async function action({ request }) {
  // intercepts the outgoing request when submit is used
  const url = new URL(request.url);
  const s = url.pathname.split("/"); //   /product/headphones
  const slug = s[s.length - 1];
  const formData = await request.formData(); // gets the form data
  const count = formData.get("count"); // by name property
  try {
    const data = await addToCart(slug, count);
    return data.name;
  } catch (error) {
    return error.message;
  }
}

const Hero = ({ data, noOfItems, setNoOfItems }) => {
  const [count, setCount] = useState(0);
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  // console.log(user);
  const handleIncrease = () => {
    setCount((curr) => curr + 1);
  };
  const handleDecrease = () => {
    setCount((curr) => (curr > 0 ? curr - 1 : 0));
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (parseInt(value) < 0) {
      setCount(0);
    } else {
    }
    setCount(parseInt(value));
  };
  const handleClick = (e) => {
    setNoOfItems((prev) => prev + 1);
  };
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
            <Form method="put">
              {/* Better to put it as patch but we have only one property so this is fine */}
              {/* Form submission is a navigation event. Use replace keyword to replace it from history stack and not get back here after submission */}
              {/* We dont need handleChange and handleSubmit functions here. States are also not required but we use them here since there is + and - button */}
              <div className="flex mt-4 gap-4">
                <div className="bg-lightGray px-4  flex justify-center items-center">
                  <span
                    className="text-[35px] text-dimGray cursor-pointer"
                    onClick={handleDecrease}
                  >
                    -
                  </span>
                  <input
                    type="number"
                    name="count"
                    id="itemCount"
                    className="w-[60px] ml-4 text-center bg-lightGray"
                    min={1}
                    value={count}
                    onChange={handleChange}
                  />
                  <span
                    className="text-[35px] text-dimGray cursor-pointer"
                    onClick={handleIncrease}
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
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
