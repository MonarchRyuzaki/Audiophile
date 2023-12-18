import React from "react";

const ShippingInfo = () => {
  return (
    <div>
      <div className="uppercase font-bold text-sm tracking-wide text-orange my-6">
        Shipping Info
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <label
            htmlFor="address"
            className="text-sm font-bold text-black block my-2"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="1131 Williams Avenue"
            className="border-2 px-4 py-2 rounded-lg border-lightGray w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="w-full">
            <label
              htmlFor="zip"
              className="text-sm font-bold text-black block my-2"
            >
              ZIP code
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="10001"
              className="border-2 px-4 py-2 rounded-lg border-lightGray w-full"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="city"
              className="text-sm font-bold text-black block my-2"
            >
              City
            </label>
            <input
              type="email"
              name="city"
              id="city"
              placeholder="New York"
              className="border-2 px-4 py-2 rounded-lg border-lightGray w-full"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="country"
            className="text-sm font-bold text-black block my-2"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="United States"
            className="border-2 px-4 py-2 rounded-lg border-lightGray w-full sm:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
