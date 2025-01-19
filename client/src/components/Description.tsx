import desktop from "../assets/shared/desktop/image-best-gear.jpg";
import mobile from "../assets/shared/mobile/image-best-gear.jpg";
import tablet from "../assets/shared/tablet/image-best-gear.jpg";
const Description = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full my-40">
      <div className="flex-1 p-8 flex flex-col justify-center">
        <h1 className="text-5xl text-black tracking-wider mb-14 font-semibold leading-[60px]">
          BRINGING YOU THE <br className="hidden lg:block" />{" "}
          <span className="text-orange">BEST</span> AUDIO GEAR
        </h1>
        <div className="text-dimGray max-w-[550px]">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </div>
      </div>
      <img src={mobile} alt="" className="block sm:hidden" />
      <img src={tablet} alt="" className="hidden sm:block lg:hidden" />
      <img src={desktop} alt="" className="hidden lg:block" />
    </div>
  );
};

export default Description;
