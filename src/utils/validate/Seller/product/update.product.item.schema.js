import * as yup from "yup";

const updateProductItemWithoutImageSchema = yup.object().shape({
  price: yup.number().required("Price is required"),
  qtyInStock: yup.number().required("Quantity in stock is required"),
  status: yup.boolean().required("Status is required"),
  imageProductList: yup.array().of(
    yup.object().shape({
      imgProductId: yup.number().required(),
      imgPublicId: yup.string().required(),
      imgProductUrl: yup.string().url().required(),
    })
  ),
  optionTypes: yup.array().of(
    yup.object().shape({
      opTypeId: yup.number().required(),
      optionName: yup.string().required(),
      optionValue: yup.object().shape({
        opValueId: yup.number().required(),
        valueName: yup.string().required(),
      }),
    })
  ),
  pitemId: yup.number().required("Product item ID is required"),
});

export default updateProductItemWithoutImageSchema;
