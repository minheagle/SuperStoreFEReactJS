import * as yup from "yup";

const createProductSchema = (data) =>
  yup.object().shape({
    categoryId: yup
      .string()
      .required("Required")
      .test("isValidCategory", "Invalid category", (value) => {
        const selectedNode = data.find((node) => {
          return node.id === Number.parseInt(value);
        });
        return selectedNode && selectedNode.right - selectedNode.left === 1;
      }),
    productName: yup
      .string()
      .required("Required")
      .min(3, "Min 3 character")
      .max(150, "Max 150 character"),
    description: yup
      .string()
      .required("Required")
      .min(10, "Min 10 character")
      .max(255, "Max 255 character"),
  });

export default createProductSchema;
