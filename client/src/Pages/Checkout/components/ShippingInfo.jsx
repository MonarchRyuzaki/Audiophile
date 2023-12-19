import React from "react";

const ShippingInfo = ({ formik }) => {
  return (
    <div>
      <div className="uppercase font-bold text-sm tracking-wide text-orange my-6">
        Shipping Info
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <label
            htmlFor="address"
            className="text-sm font-bold text-black flex my-2 justify-between"
          >
            <div
              className={`${
                formik.errors.address &&
                formik.touched.address &&
                "text-red-500"
              }`}
            >
              Address
            </div>
            {formik.errors.address && formik.touched.address && (
              <div className="text-red-500">{formik.errors.address}</div>
            )}
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="1131 Williams Avenue"
            className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
              formik.errors.address && formik.touched.address
                ? "border-red-500"
                : "border-lightGray"
            }`}
            onChange={formik.handleChange}
            value={formik.values.address}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="w-full">
            <label
              htmlFor="zip"
              className="text-sm font-bold text-black flex my-2 justify-between"
            >
              <div
                className={`${
                  formik.errors.zip &&
                  formik.touched.zip &&
                  "text-red-500"
                }`}
              >
                ZIP code
              </div>
              {formik.errors.zip && formik.touched.zip && (
                <div className="text-red-500">{formik.errors.zip}</div>
              )}
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="10001"
              className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
                formik.errors.zip && formik.touched.zip
                  ? "border-red-500"
                  : "border-lightGray"
              }`}
              onChange={formik.handleChange}
              value={formik.values.zip}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="city"
              className="text-sm font-bold text-black flex my-2 justify-between"
            >
              <div
                className={`${
                  formik.errors.city &&
                  formik.touched.city &&
                  "text-red-500"
                }`}
              >
                City
              </div>
              {formik.errors.city && formik.touched.city && (
                <div className="text-red-500">{formik.errors.city}</div>
              )}
            </label>
            <input
              type="email"
              name="city"
              id="city"
              placeholder="New York"
              className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
                formik.errors.city && formik.touched.city
                  ? "border-red-500"
                  : "border-lightGray"
              }`}
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="country"
            className="text-sm font-bold text-black flex my-2 justify-between"
          >
            <div
              className={`${
                formik.errors.country &&
                formik.touched.country &&
                "text-red-500"
              }`}
            >
              Country
            </div>
            {formik.errors.country && formik.touched.country && (
              <div className="text-red-500">{formik.errors.country}</div>
            )}
          </label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="United States"
            className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
              formik.errors.country && formik.touched.country
                ? "border-red-500"
                : "border-lightGray"
            }`}
            onChange={formik.handleChange}
            value={formik.values.country}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
