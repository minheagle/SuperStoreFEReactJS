import { useDispatch } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";
import moment from "moment/moment";

import DatePicker from "react-datepicker";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createVoucher } from "../../../redux/slice/seller/voucher.seller.slice";
import promotionSchema from "../../../utils/validate/Seller/voucher/create.voucher.schema";
import ROUTES from "../../../constants/ROUTES";

const CreateVoucher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = moment();

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  const shopName = shopData?.storeName?.replaceAll(" ", "-");

  const initialValues = {
    sellerId: shopData.id,
    name: "",
    description: "",
    startDate: today.toDate(),
    endDate: null,
    discountType: "",
    discountValue: "",
    minPurchaseAmount: "",
    isActive: true,
    usageLimitPerUser: "",
  };

  const handleOnSubmit = (values) => {
    // console.log(values);
    dispatch(
      createVoucher({
        promotionRequestCreate: values,
        callback: {
          goToList: () =>
            navigate(generatePath(ROUTES.SELLER.VOUCHER.LIST, { shopName })),
        },
      })
    );
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full flex justify-center items-center">
        <h2 className="font-semibold text-xl">Create Voucher</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={promotionSchema}
        onSubmit={(values) => handleOnSubmit(values)}
      >
        {({ errors }) => (
          <Form className="w-1/2 flex flex-col justify-start items-center gap-4">
            {/* Name */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="name"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  Name :
                </label>
                {errors.name ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.name}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.name ? "outline outline-2 outline-red-500" : ""
                }`}
              />
            </div>
            {/* Description */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="description"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  Description :
                </label>
                {errors.description ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.description}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                type="text"
                id="description"
                name="description"
                placeholder="Enter your description promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.description ? "outline outline-2 outline-red-500" : ""
                }`}
              />
            </div>
            {/* Start Date */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="startDate"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  Start Date :
                </label>
                {errors.startDate ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.startDate}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                type="date"
                id="startDate"
                name="startDate"
                placeholder="Enter your start date promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.startDate ? "outline outline-2 outline-red-500" : ""
                }`}
              >
                {({ field, form }) => {
                  const { name } = field;
                  const { setFieldValue } = form;
                  const value = field.value ? moment(field.value) : null;
                  return (
                    <div className="w-full flex justify-start items-center">
                      <DatePicker
                        id={name}
                        selected={value ? value.toDate() : null}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="mm/dd/yyyy"
                        onChange={(date) => setFieldValue(name, moment(date))}
                        className="w-full outline-none"
                      />
                    </div>
                  );
                }}
              </Field>
            </div>
            {/* End Date */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="endDate"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  End Date :
                </label>
                {errors.endDate ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.endDate}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                type="date"
                id="endDate"
                name="endDate"
                placeholder="Enter your end date promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.endDate ? "outline outline-2 outline-red-500" : ""
                }`}
              >
                {({ field, form }) => {
                  const { name } = field;
                  const { setFieldValue } = form;
                  const value = field.value ? moment(field.value) : null;
                  return (
                    <div className="w-full flex justify-start items-center">
                      <DatePicker
                        id={name}
                        selected={value ? value.toDate() : null}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="mm/dd/yyyy"
                        onChange={(date) => setFieldValue(name, moment(date))}
                        className="w-full outline-none"
                      />
                    </div>
                  );
                }}
              </Field>
            </div>
            {/* Discount Type */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="discountType"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  Discount Type :
                </label>
                {errors.discountType ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.discountType}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                as="select"
                id="discountType"
                name="discountType"
                placeholder="Enter your discount type promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.discountType ? "outline outline-2 outline-red-500" : ""
                }`}
              >
                <option value="DISCOUNT_PERCENT">DISCOUNT_PERCENT</option>
                <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
                <option value="FREE_SHIP">FREE_SHIP</option>
              </Field>
            </div>
            {/* Discount Value */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="discountValue"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  Discount Value :
                </label>
                {errors.discountValue ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.discountValue}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                type="number"
                id="discountValue"
                name="discountValue"
                placeholder="Enter your discount value promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.discountValue
                    ? "outline outline-2 outline-red-500"
                    : ""
                }`}
              />
            </div>
            {/* Min Purchase Amount */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="minPurchaseAmount"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  Min Purchase Amount :
                </label>
                {errors.minPurchaseAmount ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.minPurchaseAmount}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                type="number"
                id="minPurchaseAmount"
                name="minPurchaseAmount"
                placeholder="Enter your min purchase amount promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.minPurchaseAmount
                    ? "outline outline-2 outline-red-500"
                    : ""
                }`}
              />
            </div>
            {/* usageLimitPerUser */}
            <div className="w-full flex flex-col justify-start items-center gap-2">
              <div className="w-full flex justify-between items-center">
                <label
                  htmlFor="usageLimitPerUser"
                  className="w-full flex justify-start items-center font-semibold"
                >
                  Usage Limit Per User :
                </label>
                {errors.usageLimitPerUser ? (
                  <div className="w-full flex justify-end items-center gap-2 text-primary">
                    <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                    <span className="text-sm">{errors.usageLimitPerUser}</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Field
                type="number"
                id="usageLimitPerUser"
                name="usageLimitPerUser"
                placeholder="Enter your usage limit per user promotion"
                className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                  errors.usageLimitPerUser
                    ? "outline outline-2 outline-red-500"
                    : ""
                }`}
              />
            </div>
            <div className="w-full flex justify-start items-center">
              <button
                type="submit"
                className="px-2 py-1 bg-primary text-white rounded"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateVoucher;
