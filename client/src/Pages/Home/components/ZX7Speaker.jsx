import { Link } from "react-router-dom";

const ZX7Speaker = () => {
  return (
    <div className="bg-zx7 h-[400px] rounded-lg mt-16 px-6">
      <div className="relative top-[35%] left-[5%]">
        <h1 className="text-black text-4xl font-semibold mb-14 tracking-wider">
          ZX7 SPEAKER
        </h1>
        <Link
          to="product/zx7-speaker"
          className={`uppercase text-black text-[.8125rem] px-8 py-4 mt-[-10px] hover:bg-black hover:text-white transition duration-300 ease-in-out border-2 border-black`}
        >
          see product
        </Link>
      </div>
    </div>
  );
};

export default ZX7Speaker;
