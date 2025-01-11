import { Link } from "react-router-dom";

const Others = ({ data }) => {
  const { others } = data;
  return (
    <div className="my-32">
      <h2 className="uppercase text-4xl font-semibold tracking-wider mb-8 text-center">
        you may also like
      </h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {others.map((item, idx) => (
          <div className="flex flex-col justify-center items-center" key={idx}>
            <img
              src={item.image.tablet}
              alt=""
              className="block sm:hidden rounded-lg"
            />
            <img
              src={item.image.mobile}
              alt=""
              className="hidden sm:block lg:hidden rounded-lg"
            />
            <img
              src={item.image.desktop}
              alt=""
              className="hidden lg:block rounded-lg"
            />
            <h3 className="text-3xl text-black font-semibold uppercase my-8">
              {item.name}
            </h3>
            <Link
              to={`/product/${item.slug}`}
              className={`uppercase bg-orange text-primary text-[.8125rem] px-8 py-4 mt-[-10px] hover:opacity-[89%] transition duration-300 ease-in-out`}
            >
              see product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Others;
