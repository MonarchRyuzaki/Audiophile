import React from "react";

const BillingDetails = () => {
  return (
    <div>
      <div className="uppercase font-bold text-sm tracking-wide text-orange my-6">
        Billing Details
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="w-full">
            <label
              htmlFor="name"
              className="text-sm font-bold text-black block my-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Alexei Ward"
              className="border-2 px-4 py-2 rounded-lg  w-full border-lightGray"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-sm font-bold text-black block my-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="alexei@mail.com"
              className="border-2 px-4 py-2 rounded-lg border-lightGray w-full"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="phoneno"
            className="text-sm font-bold text-black block my-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phoneno"
            id="phoneno"
            placeholder="+1 202 555 0136"
            className="border-2 px-4 py-2 rounded-lg border-lightGray w-full sm:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
