import { Link, NavLink } from "react-router-dom";
import cart from "../assets/shared/desktop/icon-cart.svg";
import logo from "../assets/shared/desktop/logo.svg";
import "./hoverAnimation.css";

const Navbar = () => {
  const activeStyles = {
    textDecoration: "underline",
    textUnderlineOffset: "0.55rem",
    textDecorationThickness: "1.5px",
  };
  return (
    <div className="bg-black flex justify-center items-center px-6 sm:px-16 sticky top-0 z-50">
      <div className="w-full max-w-[1280px]">
        <div className="flex justify-between py-8 border-b-[#fafafa1a] border-b-[3px]">
          <Link to=".">
            <img src={logo} alt="" />
          </Link>
          <div className="flex justify-between gap-10 mr-[14rem]">
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="."
            >
              Home
            </NavLink>
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="headphones"
            >
              Headphones
            </NavLink>
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="speakers"
            >
              Speaker
            </NavLink>
            <NavLink
              className="text-primary font-bold uppercase text-[.8125rem] tracking-widest hover-underline-animation"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="earphones"
            >
              Earphones
            </NavLink>
          </div>
          <Link to="checkout">
            <img src={cart} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
