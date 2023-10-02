import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, generatePath } from "react-router-dom";
import { Formik, Form, Field } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingFull from "../../components/common/LoadingFull";

import ROUTES from "../../constants/ROUTES";
import ROLES from "../../constants/ROLES";
import backgroundPage from "../../assets/become-seller-background-page.jpg";
import becomeSellerValidatorSchema from "../../utils/validate/User/become.seller.validator.schema";

import handleRoles from "../../utils/handle/handleRoles.js";
import { becomeSeller } from "../../redux/slice/user/user.slice";

const BecomeSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(
    (state) => state.User.become_seller
  );
  const [displayError, setDisplayError] = useState(true);

  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (accessToken) {
    if (handleRoles.checkRole(ROLES.SELLER, userData.roles)) {
      return <Navigate to={ROUTES.SELLER.HOME_PAGE.PAGE} />;
    }
  } else {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} />;
  }

  const initialValues = {
    storeName: "",
    storeAddress: "",
    // storePhoneNumber: "",
  };

  const handleOnChangeField = (setFieldValue, e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFieldValue(fieldName, fieldValue);
    if (error) {
      setDisplayError(false);
    }
  };

  const handleErrorFromApi = (fieldName) => {
    if (error) {
      const errorObject = error?.find((item) => item.field === fieldName);
      return errorObject?.message;
    }
  };

  const handleErrorFieldFromApi = (fieldName) => {
    if (error) {
      const errorObject = error?.find((item) => item.field === fieldName);
      if (errorObject) {
        return true;
      }
    }
    return false;
  };

  const handleOnSubmit = (values) => {
    // console.log(values);
    dispatch(
      becomeSeller({
        registerSeller: {
          ...values,
          userId: userData.id,
        },
        userId: userData.id,
        callback: {
          goToSellerPage: (param) => {
            const shopName = param.replaceAll(" ", "-");
            return (
              <Navigate
                to={generatePath(ROUTES.SELLER.HOME_PAGE.PAGE, {
                  shopName: shopName,
                })}
              />
            );
          },
        },
      })
    );
  };

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-12">
        <div
          className="w-full h-without-header-24-rem flex justify-start items-center p-12 bg-cover"
          style={{
            backgroundImage: `url(${backgroundPage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={becomeSellerValidatorSchema}
            onSubmit={(values) => handleOnSubmit(values)}
          >
            {({ errors, setFieldValue }) => (
              <Form className="w-1/3 flex flex-col justify-start items-center gap-8 p-8 bg-white shadow appearance-none border rounded">
                <div className="w-full flex justify-center items-center font-semibold text-2xl text-primary">
                  <h2>Become Seller</h2>
                </div>
                {/* Store Name */}
                <div className="w-full flex flex-col justify-start items-center gap-2">
                  <div className="w-full flex justify-between items-center">
                    <label
                      htmlFor="storeName"
                      className="w-full flex justify-start items-center font-semibold"
                    >
                      Store Name :
                    </label>
                    {errors.storeName ||
                    (displayError
                      ? handleErrorFieldFromApi("storeName")
                      : "") ? (
                      <div className="w-full flex justify-end items-center gap-2 text-primary">
                        <FontAwesomeIcon
                          icon="fas fa-info-circle"
                          className=""
                        />
                        <span className="text-sm">
                          {errors.storeName ||
                            (displayError
                              ? handleErrorFromApi("storeName")
                              : "")}
                        </span>
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
                    onChange={(e) => handleOnChangeField(setFieldValue, e)}
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
                    {errors.storeAddress ||
                    (displayError
                      ? handleErrorFieldFromApi("storeAddress")
                      : "") ? (
                      <div className="w-full flex justify-end items-center gap-2 text-primary">
                        <FontAwesomeIcon
                          icon="fas fa-info-circle"
                          className=""
                        />
                        <span className="text-sm">
                          {errors.storeAddress ||
                            (displayError
                              ? handleErrorFromApi("storeAddress")
                              : "")}
                        </span>
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
                    onChange={(e) => handleOnChangeField(setFieldValue, e)}
                    className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                      errors.storeAddress
                        ? "outline outline-2 outline-red-500"
                        : ""
                    }`}
                  />
                </div>
                {/* Store Phone Number */}
                {/* <div className="w-full flex flex-col justify-start items-center gap-2">
                  <div className="w-full flex justify-between items-center">
                    <label
                      htmlFor="storePhoneNumber"
                      className="w-full flex justify-start items-center font-semibold"
                    >
                      Store Phone Number :
                    </label>
                    {errors.storeName ||
                    (displayError
                      ? handleErrorFieldFromApi("userName")
                      : "") ? (
                      <div className="w-full flex justify-end items-center gap-2 text-primary">
                        <FontAwesomeIcon
                          icon="fas fa-info-circle"
                          className=""
                        />
                        <span className="text-sm">
                          {errors.userName ||
                            (displayError
                              ? handleErrorFromApi("userName")
                              : "")}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
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
                    onChange={(e) => handleOnChangeField(setFieldValue, e)}
                    className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
                      errors.storePhoneNumber
                        ? "outline outline-2 outline-red-500"
                        : ""
                    }`}
                  />
                </div> */}
                <button
                  type="submit"
                  className="w-20 h-10 text-white bg-primary rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
