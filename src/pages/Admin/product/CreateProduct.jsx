import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createProduct } from "../../../redux/slice/admin/product.slice";

import ImageUploader from "../../../components/Admin/ImageUploader";
import SelectCustom from "../../../components/common/SelectCustom";
import OptionForProduct from "../../../components/Admin/OptionForProduct";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [createProductForm, setCreateProductForm] = useState({
    productName: "",
    category: "",
    basePrice: "",
    isNew: false,
    options: [],
    descriptions: "",
  });

  console.log(createProductForm);

  const handleImageChange = (e) => {
    const files = e.target.files;

    const listImages = [...images];
    for (let i = 0; i < files.length; i++) {
      listImages.push(files[i]);
    }
    setImages(listImages);
  };

  const handleDeleteImage = (image) => {
    const newImages = images.filter((img) => img !== image);
    setImages(newImages);
  };

  const handleOnChangeForm = (e) => {
    const { name, value } = e.target;
    setCreateProductForm((preForm) => ({
      ...preForm,
      [name]: value,
    }));
  };

  const handleOnChangeIsNew = (e) => {
    setCreateProductForm((preForm) => ({
      ...preForm,
      isNew: e.target.checked,
    }));
  };

  const handleOnChangeOptions = (options) => {
    setCreateProductForm((preForm) => ({
      ...preForm,
      options: options,
    }));
  };

  const handleFormData = () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("productName", createProductForm.productName);
    formData.append("basePrice", createProductForm.basePrice);
    formData.append("isNew", createProductForm.isNew);
    formData.append("options", createProductForm.options);
    formData.append("descriptions", createProductForm.descriptions);
    console.log(formData);
    return formData;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(createProduct(handleFormData()));
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-4 bg-white rounded p-8">
        <h2>Create Product</h2>
        <form
          action=""
          onSubmit={(e) => handleSubmitForm(e)}
          className="w-1/2 flex flex-col justify-start items-center gap-4 p-4 rounded bg-slate-100"
        >
          <label htmlFor="" className="w-full flex flex-col gap-2">
            <span>Product Name :</span>
            <input
              name="productName"
              type="text"
              onChange={(e) => handleOnChangeForm(e)}
              className="outline-none pl-2"
            />
          </label>
          <label htmlFor="" className="w-full flex flex-col gap-2">
            <span>Category :</span>
            <SelectCustom onChange={(e) => handleOnChangeForm(e)} />
          </label>
          <label htmlFor="" className="w-full flex flex-col gap-2">
            <span>Base Price :</span>
            <input
              name="basePrice"
              type="text"
              onChange={(e) => handleOnChangeForm(e)}
              className="outline-none pl-2"
            />
          </label>
          <label htmlFor="" className="w-full flex flex-col gap-2">
            <span>Is New :</span>
            <input
              name="isNew"
              type="checkbox"
              onChange={(e) => handleOnChangeIsNew(e)}
              className="w-6 h-6 text-left"
            />
          </label>
          <label htmlFor="" className="w-full flex flex-col gap-2">
            <span>Options :</span>
            <OptionForProduct handleOnChangeOptions={handleOnChangeOptions} />
          </label>
          <label htmlFor="" className="w-full flex flex-col gap-2">
            <span>Image :</span>
            <ImageUploader
              images={images}
              handleImageChange={handleImageChange}
              handleDeleteImage={handleDeleteImage}
            />
          </label>
          <label htmlFor="" className="w-full flex flex-col gap-2">
            <span>Descriptions :</span>
            <input
              name="descriptions"
              type="text"
              onChange={(e) => handleOnChangeForm(e)}
              className="outline-none pl-2"
            />
          </label>
          <button
            type="submit"
            className="w-20 h-8 text-white bg-slate-500 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
