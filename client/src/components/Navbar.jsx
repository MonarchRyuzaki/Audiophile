import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cart from "../assets/shared/desktop/icon-cart.svg";
import logo from "../assets/shared/desktop/logo.svg";
import hamburger from "../assets/shared/tablet/icon-hamburger.svg";
import "./hoverAnimation.css";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const activeStyles = {
    textDecoration: "underline",
    textUnderlineOffset: "0.55rem",
    textDecorationThickness: "1.5px",
  };
  return (
    <div className="bg-black flex justify-center items-center px-6 sm:px-16 sticky top-0 z-50">
      <div className="w-full max-w-[1280px]">
        <div className="xl:flex justify-between py-8 border-b-[#fafafa1a] border-b-[3px] hidden">
          <Link to=".">
            <img src={logo} alt="" className="cursor-pointer" />
          </Link>
          <div className="flex justify-between gap-10 mr-[14rem]">
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation cursor-pointer"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="."
            >
              Home
            </NavLink>
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation cursor-pointer"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="headphones"
            >
              Headphones
            </NavLink>
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation cursor-pointer"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="speakers"
            >
              Speaker
            </NavLink>
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation cursor-pointer"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="earphones"
            >
              Earphones
            </NavLink>
          </div>
          <Link to="checkout">
            <img src={cart} alt="" className="cursor-pointer" />
          </Link>
        </div>
        <div className="xl:hidden flex justify-between items-center py-5 border-b-[#fafafa1a] border-b-[3px]">
          <img src={hamburger} alt="" onClick={() => setToggle(prev => !prev)} />
          <Link to=".">
            <img src={logo} alt="" className="cursor-pointer" />
          </Link>
          <Link to="checkout">
            <img src={cart} alt="" className="cursor-pointer" />
          </Link>
        </div>
        <div className={`${toggle?"flex" : "hidden"} xl:hidden flex flex-col gap-5 py-5 `}>
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
      </div>
    </div>
  );
};

export default Navbar;
