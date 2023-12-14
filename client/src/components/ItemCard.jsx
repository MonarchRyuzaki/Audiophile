import SeeProduct from "./SeeProduct";

const ItemCard = ({ item, idx }) => {
  return (
    <div
      className={`flex flex-col ${
        idx % 2 == 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } justify-center items-center my-28 gap-16`}
      key={idx}
    >
      <img src={item.categoryImage.mobile} alt="" className="block sm:hidden" />
      <img
        src={item.categoryImage.tablet}
        alt=""
        className="hidden sm:block lg:hidden"
      />
      <img
        src={item.categoryImage.desktop}
        alt=""
        className="hidden lg:block w-[500px]"
      />
      <div className="flex flex-1 flex-col justify-center">
        <div>
          <h2 className="text-5xl text-black font-semibold uppercase leading-[60px]">
            {item.name} <br /> {item.category}
          </h2>
          <div className="text-dimGray text-lg my-9">{item.description}</div>
          <SeeProduct bg="orange" text="primary" border="orange" />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
