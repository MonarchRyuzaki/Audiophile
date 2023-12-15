import React from "react";

const Details = ({ data }) => {
  const itemList = () => {
    const list = data.includes;
    return (
        <>
            {list.map((item) => {
                return (
                    <div className="flex gap-5">
                        <span className="text-orange font-semibold text-xl">{item.quantity}x</span>
                        <span className="text-dimGray font-medium text-lg">{item.item}</span>
                    </div>
                )
            })}
        </>
    ) 
  }
  return (
    <div className="flex flex-col lg:flex-row my-32 gap-20">
      <div className="flex-1">
        <h2 className="uppercase text-4xl font-semibold tracking-wider mb-8">
          features
        </h2>
        <div className="text-md text-dimGray">{data.features}</div>
      </div>
      <div className="flex-1 p-6 flex justify-center">
        <div>
          <h2 className="uppercase text-4xl font-semibold tracking-wider mb-8">
            in the box
          </h2>
          <div>
            {itemList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
