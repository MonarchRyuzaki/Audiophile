import desktop from "../../../assets/home/desktop/image-earphones-yx1.jpg";
import tablet from "../../../assets/home/tablet/image-earphones-yx1.jpg";
import mobile from "../../../assets/home/mobile/image-earphones-yx1.jpg";
import { SeeProduct } from "../../../components";
import { selectImage } from "../../../utils";

const YX1Earphone = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-14">
      <img src={desktop} alt="" className="flex-1 rounded-lg block" />
      <div className="flex-1 bg-lightGray flex flex-col justify-center items-start rounded-lg px-8 py-20 sm:py-32">
        <div className="ml-7">
          <h1 className="text-black text-4xl font-semibold mb-14 tracking-wider">
            YX1 EARPHONE
          </h1>
          <SeeProduct text="black" />
        </div>
      </div>
    </div>
  );
};

export default YX1Earphone;
