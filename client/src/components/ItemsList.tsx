import earphoneImg from "../assets/shared/desktop/image-category-thumbnail-earphones.png";
import headphoneImg from "../assets/shared/desktop/image-category-thumbnail-headphones.png";
import speakerImg from "../assets/shared/desktop/image-category-thumbnail-speakers.png";
import { Items } from "./index";

const ItemsList = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-4 mt-28 gap-20">
      <Items title="Headphones" img={headphoneImg} link="headphones" />
      <Items title="Speaker" img={speakerImg} link="speakers" />
      <Items title="Earphone" img={earphoneImg} link="earphones" />
    </div>
  );
};

export default ItemsList;
