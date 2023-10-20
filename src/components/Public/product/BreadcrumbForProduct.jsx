import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllList } from "../../../redux/slice/public/category.public.slice";

const BreadcrumbForProduct = ({ categoryId, productName }) => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.CategoryPublic.list);

  //   console.log(data);
  useEffect(() => {
    dispatch(getAllList());
  }, []);

  const getAllParentOfCategory = () => {
    const breadcrumb = [];
    const allParentCategory = [];
    const currentCategory = data?.find((item) => item.id === categoryId);
    allParentCategory.push(currentCategory);
    data?.forEach((item) => {
      if (
        item?.left < currentCategory?.left &&
        item?.right > currentCategory?.right
      ) {
        allParentCategory.push(item);
      }
    });
    allParentCategory?.sort((a, b) => a.left - b.left);
    allParentCategory?.forEach((item) => {
      breadcrumb.push(item?.content);
      breadcrumb.push(">");
    });
    breadcrumb.push(productName);
    return breadcrumb;
  };

  const handleRenderBreadcrumb = () => {
    const data = getAllParentOfCategory();
    return data?.map((item, index) => {
      return (
        <div key={index}>
          {index === data.length ? (
            <span className="line-clamp-1">{item}</span>
          ) : (
            <span>{item}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full flex justify-start items-center gap-2">
      {handleRenderBreadcrumb()}
    </div>
  );
};

export default BreadcrumbForProduct;
