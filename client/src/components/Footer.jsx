import { NavLink } from "react-router-dom";
import facebook from "../assets/shared/desktop/icon-facebook.svg";
import instagram from "../assets/shared/desktop/icon-instagram.svg";
import twitter from "../assets/shared/desktop/icon-twitter.svg";
import logo from "../assets/shared/desktop/logo.svg";

const Footer = () => {
  return (
    <div className="bg-black flex justify-center items-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px] text-gray">
        <div className="sm:flex justify-between sm:pt-6">
          <div className="flex justify-center items-center pb-6 pt-8 sm:py-0">
            <img src={logo} alt="" className="object-contain " />
          </div>
          <div className="text-primary flex flex-col text-center sm:flex-row gap-4 py-4">
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
        <div className="my-6 lg:max-w-[640px]">
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 mb-6">
          <div>Copyright 2021. All Rights Reserved</div>
          <div className="flex gap-6">
            <img src={facebook} alt="" />
            <img src={instagram} alt="" />
            <img src={twitter} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
