import { ItemsList } from "../../components";
import { Hero } from "./components";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="bg-hero flex justify-center items-center px-6 sm:px-16 min-h-[83vh]"
      >
        <div className="w-full xl:max-w-[1280px]">
          <Hero />
        </div>
      </div>
      <div className="bg-primary flex justify-center items-center px-6 sm:px-16">
        <div className="w-full xl:max-w-[1280px]">
          <ItemsList />
          ZX9 Speaker 
          ZX7 Speaker 
          YX1 Earphone 
          Description{" "}
          {/* From main component */}
        </div>
      </div>
    </div>
  );
};

export default Home;
