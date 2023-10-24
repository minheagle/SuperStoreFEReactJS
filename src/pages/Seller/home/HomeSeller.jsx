import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import {
  getInformationDetail,
  changeInformation,
} from "../../../redux/slice/seller/information.seller.slice";
import updateInformationSellerValidatorSchema from "../../../utils/validate/Seller/information/update.information,seller.schema";

import HeaderOfShop from "../../../components/Seller/HeaderOfShop";
import LoadingFull from "../../../components/common/LoadingFull";

const HomeSeller = () => {
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  const [edit, setEdit] = useState(false);

  const { information_detail } = useSelector(
    (state) => state.InformationSeller
  );

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  useEffect(() => {
    dispatch(
      getInformationDetail({
        sellerId: shopData.id,
      })
    );
    window.scroll(0, 0);
  }, []);

  const initialValues = {
    id: information_detail?.data?.id ? information_detail?.data?.id : null,
    storeName: information_detail?.data?.storeName
      ? information_detail?.data?.storeName
      : "",
    storeAddress: information_detail?.data?.storeAddress
      ? information_detail?.data?.storeAddress
      : "",
    storePhoneNumber: information_detail?.data?.storePhoneNumber
      ? information_detail?.data?.storePhoneNumber
      : "",
    storeBankName: information_detail?.data?.storeBankName
      ? information_detail?.data?.storeBankName
      : "",
    storeBankAccountNumber: information_detail?.data?.storeBankAccountNumber
      ? information_detail?.data?.storeBankAccountNumber
      : "",
  };

  const handleSubmitForm = (values) => {
    dispatch(
      changeInformation({
        sellerRequestUpdate: values,
        sellerId: shopData.id,
        callback: {
          notification: (message) => notify(message),
        },
      })
    );
  };

  return information_detail.loading ? (
    <LoadingFull />
  ) : (
    <div className="w-full flex flex-col justify-start items-center z-10">
      <HeaderOfShop />
      <div className="w-full">
        <div className="w-full flex justify-start items-center">
          {edit ? (
            <Formik
              initialValues={initialValues}
              validationSchema={updateInformationSellerValidatorSchema}
              onSubmit={(values) => handleSubmitForm(values)}
            >
              {({ errors }) => (
                <Form className="w-1/2 flex flex-col justify-start items-center gap-4">
                  {/* Store Name */}
                  <div className="w-full flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-between items-center">
                      <label
                        htmlFor="storeName"
                        className="w-full flex justify-start items-center font-semibold"
                      >
                        Store Name :
                      </label>
                      {errors.storeName ? (
                        <div className="w-full flex justify-end items-center gap-2 text-primary">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">{errors.storeName}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Field
                      type="text"
                      id="storeName"
                      name="storeName"
                      placeholder="Enter your store name"
                      className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                        errors.storeName
                          ? "outline outline-2 outline-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {/* Store Address */}
                  <div className="w-full flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-between items-center">
                      <label
                        htmlFor="storeAddress"
                        className="w-full flex justify-start items-center font-semibold"
                      >
                        Store Address :
                      </label>
                      {errors.storeAddress ? (
                        <div className="w-full flex justify-end items-center gap-2 text-primary">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">{errors.storeAddress}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Field
                      type="text"
                      id="storeAddress"
                      name="storeAddress"
                      placeholder="Enter your store address"
                      className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                        errors.storeAddress
                          ? "outline outline-2 outline-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {/* Store Phone Number */}
                  <div className="w-full flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-between items-center">
                      <label
                        htmlFor="storePhoneNumber"
                        className="w-full flex justify-start items-center font-semibold"
                      >
                        Phone Number :
                      </label>
                      {errors.storePhoneNumber ? (
                        <div className="w-full flex justify-end items-center gap-2 text-primary">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">
                            {errors.storePhoneNumber}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Field
                      type="text"
                      id="storePhoneNumber"
                      name="storePhoneNumber"
                      placeholder="Enter your store phone number"
                      className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                        errors.storePhoneNumber
                          ? "outline outline-2 outline-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {/* Store Bank Name */}
                  <div className="w-full flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-between items-center">
                      <label
                        htmlFor="storeBankName"
                        className="w-full flex justify-start items-center font-semibold"
                      >
                        Store Bank Name :
                      </label>
                      {errors.storeBankName ? (
                        <div className="w-full flex justify-end items-center gap-2 text-primary">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">
                            {errors.storeBankName}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Field
                      type="text"
                      id="storeBankName"
                      name="storeBankName"
                      placeholder="Enter your store bank name"
                      className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                        errors.storeBankName
                          ? "outline outline-2 outline-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {/* Store Bank Account Number */}
                  <div className="w-full flex flex-col justify-start items-center gap-2">
                    <div className="w-full flex justify-between items-center">
                      <label
                        htmlFor="storeBankAccountNumber"
                        className="w-full flex justify-start items-center font-semibold"
                      >
                        Store Bank Account Number :
                      </label>
                      {errors.storeBankAccountNumber ? (
                        <div className="w-full flex justify-end items-center gap-2 text-primary">
                          <FontAwesomeIcon
                            icon="fas fa-info-circle"
                            className=""
                          />
                          <span className="text-sm">
                            {errors.storeBankAccountNumber}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <Field
                      type="text"
                      id="storeBankAccountNumber"
                      name="storeBankAccountNumber"
                      placeholder="Enter your store bank account number"
                      className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                        errors.storeBankAccountNumber
                          ? "outline outline-2 outline-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="w-full flex justify-start items-center gap-4">
                    <button
                      type="submit"
                      className="px-2 py-1 bg-primary text-white rounded"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setEdit(false)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="w-full flex flex-col justify-start items-start gap-4 py-4">
              <div className="flex gap-4">
                <span className="w-60 font-medium">{"->"} Store Name</span>
                <span className="font-medium">:</span>
                <span>{information_detail?.data?.storeName}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-60 font-medium">{"->"} Store Address</span>
                <span className="font-medium">:</span>
                <span>{information_detail?.data?.storeAddress}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-60 font-medium">
                  {"->"} Store Phone Number
                </span>
                <span className="font-medium">:</span>
                <span>{information_detail?.data?.storePhoneNumber}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-60 font-medium">{"->"} Store Bank Name</span>
                <span className="font-medium">:</span>
                <span>{information_detail?.data?.storeBankName}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-60 font-medium">
                  {"->"} Store Bank Account Number
                </span>
                <span className="font-medium">:</span>
                <span>{information_detail?.data?.storeBankAccountNumber}</span>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setEdit(true)}
                  className="px-2 py-1 bg-primary text-white rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSeller;
