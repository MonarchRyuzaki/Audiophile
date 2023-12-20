import React from "react";
import ItemCardSkeleton from "./ItemCardSkeleton";

const ItemListSkeleton = () => {
  const data = new Array(3).fill(0);
  return (
    <div className="flex justify-center items-center px-6 sm:px-16">
      <div className="w-full xl:max-w-[1100px]">
        {data.map((item, idx) => (
          <ItemCardSkeleton idx={idx} key={2*idx}/>
        ))}
      </div>
    </div>
  );
};

export default ItemListSkeleton;
