import { Product } from "../types";
import ItemCard from "./ItemCard";

const ItemCardList = ({ data }: { data: Product[] }) => {
  return (
    <div className="flex justify-center items-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        {data?.map((item, idx) => (
          <ItemCard item={item} idx={idx} key={item._id}/>
        ))}
      </div>
    </div>
  );
};

export default ItemCardList;
