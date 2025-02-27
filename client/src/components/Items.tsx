import { Link } from "react-router-dom";
import rightArrow from "../assets/shared/desktop/icon-arrow-right.svg";

const Items = ({
  title,
  img,
  link,
}: {
  title: string;
  img: string;
  link: string;
}) => {
  return (
    <div className="flex justify-center items-center flex-col bg-lightGray sm:w-1/3 w-[355px] rounded-lg">
      <Link to={link}>
        <img src={img} alt="" className="w-[150px] relative bottom-[50px]" />
        <div className="bg-lightGray flex flex-col justify-center items-center gap-4 mt-[-45px]">
          <div className="uppercase font-semibold tracking-wider ">{title}</div>
          <div className="uppercase font-semibold text-dimGray">
            <div className="flex gap-1 mb-4">
              <div className="text-[18px] hover:text-orange">shop</div>
              <img src={rightArrow} alt="" className="w-[18px]" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Items;
