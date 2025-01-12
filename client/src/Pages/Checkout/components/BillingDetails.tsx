const BillingDetails = ({ formik }) => {
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
              className="text-sm font-bold text-black my-2 flex justify-between"
            >
              <div
                className={`${
                  formik.errors.name && formik.touched.name && "text-red-500"
                }`}
              >
                Name
              </div>
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Alexei Ward"
              className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
                formik.errors.name && formik.touched.name
                  ? "border-red-500"
                  : "border-lightGray"
              }`}
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-sm font-bold text-black flex my-2 justify-between"
            >
              <div
                className={`${
                  formik.errors.email && formik.touched.email && "text-red-500"
                }`}
              >
                Email Address
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="alexei@mail.com"
              className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-lightGray"
              }`}
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="phoneno"
            className="text-sm font-bold text-black flex my-2 justify-between"
          >
            <div
              className={`${
                formik.errors.phoneNumber &&
                formik.touched.phoneNumber &&
                "text-red-500"
              }`}
            >
              Phone Number
            </div>
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div className="text-red-500">{formik.errors.phoneNumber}</div>
            )}
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneno"
            placeholder="+1 202 555 0136"
            className={`border-2 px-4 py-2 rounded-lg  w-full  focus:border-orange focus:ring-orange ${
              formik.errors.phoneNumber && formik.touched.phoneNumber
                ? "border-red-500"
                : "border-lightGray"
            }`}
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
