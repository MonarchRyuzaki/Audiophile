import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cart from "../assets/shared/desktop/icon-cart.svg";
import logo from "../assets/shared/desktop/logo.svg";
import hamburger from "../assets/shared/tablet/icon-hamburger.svg";
import Cart from "./Cart";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./hoverAnimation.css";
import { CartContext } from "../store/ShoppingCartContext";

const activeStyles = {
  textDecoration: "underline",
  textUnderlineOffset: "1.2rem",
  textDecorationThickness: "1.5px",
};
const Navbar = () => {
  const {cartData} = useContext(CartContext);
  const [toggle, setToggle] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  // console.log(user, isAuthenticated);
  return (
    <div className="bg-black flex justify-center items-center px-6 sm:px-16 sticky top-0 z-50">
      <div className="w-full max-w-[1100px]">
        <div className="xl:flex justify-between py-8 border-b-[#fafafa1a] border-b-[3px] hidden">
          <Link to=".">
            <img src={logo} alt="" className="cursor-pointer" />
          </Link>
          <div className="flex justify-between gap-10 mr-[14rem]">
            <NavLink
              className={({ isActive }) =>
                `text-primary font-bold uppercase text-[.8125rem] tracking-widest ${
                  !isActive ? "hover-underline-animation" : ""
                } cursor-pointer`
              }
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="."
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-primary font-bold uppercase text-[.8125rem] tracking-widest ${
                  !isActive ? "hover-underline-animation" : ""
                } cursor-pointer`
              }
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="headphones"
            >
              Headphones
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-primary font-bold uppercase text-[.8125rem] tracking-widest ${
                  !isActive ? "hover-underline-animation" : ""
                } cursor-pointer`
              }
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="speakers"
            >
              Speaker
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `text-primary font-bold uppercase text-[.8125rem] tracking-widest ${
                  !isActive ? "hover-underline-animation" : ""
                } cursor-pointer`
              }
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="earphones"
            >
              Earphones
            </NavLink>
          </div>
          <div className="relative">
            <img
              src={cart}
              alt=""
              className="cursor-pointer"
              onClick={() => setIsCardVisible((curr) => !curr)}
            />
            {cartData.items.length > 0 && (
              <span className="w-[15px] h-[15px] rounded-full text-primary bg-red-600 absolute text-center bottom-4 left-4"></span>
            )}
          </div>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
        <div className="xl:hidden flex justify-between items-center py-8 border-b-[#fafafa1a] border-b-[3px]">
          <img
            src={hamburger}
            alt=""
            onClick={() => setToggle((prev) => !prev)}
          />
          <Link to=".">
            <img src={logo} alt="" className="cursor-pointer" />
          </Link>
          <div className="flex flex-row sm:gap-10 gap-5 ">
            <div className="relative">
              <img
                src={cart}
                alt=""
                className="cursor-pointer"
                onClick={() => setIsCardVisible((curr) => !curr)}
              />
              {cartData.items.length > 0 && (
                <span className="w-[15px] h-[15px] rounded-full text-primary bg-red-600 absolute text-center bottom-4 left-4"></span>
              )}
            </div>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } xl:hidden flex flex-col gap-5 py-5 `}
        >
          <NavLink
            className="text-primary font-bold uppercase text-[.8525rem] tracking-widest cursor-pointer text-center"
            to="."
          >
            Home
          </NavLink>
          <NavLink
            className="text-primary font-bold uppercase text-[.8525rem] tracking-widest cursor-pointer text-center"
            to="headphones"
          >
            Headphones
          </NavLink>
          <NavLink
            className="text-primary font-bold uppercase text-[.8525rem] tracking-widest cursor-pointer text-center"
            to="speakers"
          >
            Speaker
          </NavLink>
          <NavLink
            className="text-primary font-bold uppercase text-[.8525rem] tracking-widest cursor-pointer text-center"
            to="earphones"
          >
            Earphones
          </NavLink>
        </div>
        {isCardVisible && (
          <Cart
            isCardVisible={isCardVisible}
            setIsCardVisible={setIsCardVisible}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
