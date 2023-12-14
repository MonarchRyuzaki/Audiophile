import desktop from "../../../assets/home/desktop/image-speaker-zx9.png";
import mobile from "../../../assets/home/mobile/image-speaker-zx9.png";
import tablet from "../../../assets/home/tablet/image-speaker-zx9.png";
import { SeeProduct } from "../../../components";
import { selectImage } from "../../../utils";

const img = selectImage(desktop, tablet, mobile);

const ZX9Speaker = () => {
  return (
    <div className="bg-orange flex flex-col lg:flex-row  overflow-hidden px-16 pt-10 justify-center lg:justify-between items-center rounded-lg mt-24 pb-10 lg:pb-0 gap-10">
      <div className="relative flex-1">
        <img
          src={img}
          alt=""
          className="w-[172px] sm:w-[196px] lg:w-[350px] lg:relative lg:top-5 z-10"
        />
      </div>
      <div className="flex-1 flex justify-center items-center flex-col lg:block">
        <h1 className="text-4xl sm:text-6xl text-primary font-semibold tracking-wider">
          ZX9 <br className="hidden lg:block" /> SPEAKER
        </h1>
        <div className="text-gray font-medium my-8 max-w-[350px]">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </div>
        <SeeProduct bg="black" text="primary" />
      </div>
    </div>
  );
};

export default ZX9Speaker;
