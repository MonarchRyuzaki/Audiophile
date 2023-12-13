import HeroImage from "../../../assets/home/desktop/hero-image-op.png";
import { SeeProduct } from "../../../components";

const Hero = () => {
  return (
    <>
    <section className="justify-between items-center my-8 hidden lg:flex">
      <div className="flex-1 text-gray">
        <h2 className="tracking-[.625rem] uppercase">New Product</h2>
        <h1 className="text-primary font-bold text-[4rem] leading-[90px] my-4">
          XX99 MARK II <br />
          HEADPHONES
        </h1>
        <p className="text-[1.06rem] max-w-[400px] mb-10">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <SeeProduct />
      </div>
      <div className="hidden lg:block">
        <img src={HeroImage} alt="" />
      </div>
    </section>
    <section className="flex flex-col justify-center items-center text-center text-gray lg:hidden">
        <div className="tracking-[.625rem] uppercase">New Product</div>
        <div className="text-primary font-bold text-[3rem] leading-[70px] sm:text-[4rem] sm:leading-[90px] my-4">
          XX99 MARK II <br />
          HEADPHONES
        </div>
        <div className="text-[1.06rem] max-w-[400px] mb-10">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </div>
        <SeeProduct />
    </section>
    </>
  );
};

export default Hero;
