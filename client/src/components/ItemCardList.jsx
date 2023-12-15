import React from "react";
import ItemCard from "./ItemCard";

const ItemCardList = ({ data }) => {
  return (
    <div className="flex justify-center items-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        {data.map((item, idx) => (
          <ItemCard item={item} idx={idx}/>
        ))}
      </div>
    </div>
  );
};

export default ItemCardList;
