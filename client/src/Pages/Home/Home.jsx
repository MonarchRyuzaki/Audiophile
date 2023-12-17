import { useOutletContext } from "react-router-dom";
import { ItemsList, Description } from "../../components";
import Cart from "../../components/Cart";
import { Hero, ZX9Speaker, ZX7Speaker, YX1Earphone } from "./components";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  const {noOfItems, setNoOfItems} = useOutletContext();
  return (
    <div className="w-full overflow-hidden">
      <div className="bg-hero flex justify-center items-center px-6 sm:px-16 min-h-[83vh]">
        <div className="w-full xl:max-w-[1100px]">
          {/* <Cart noOfItems={noOfItems} setNoOfItems={setNoOfItems}/> */}
          <Hero />
        </div>
      </div>
      <div className="bg-primary flex justify-center items-center px-6 sm:px-16">
        <div className="w-full xl:max-w-[1100px]">
          <ItemsList />
          <ZX9Speaker />
          <ZX7Speaker />
          <YX1Earphone />
          <Description />
        </div>
      </div>
    </div>
  );
};

export default Home;
