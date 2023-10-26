import { useState } from "react";

import ModalRating from "./ModalRating";

const ProductInOrder = ({ orderId, item, status }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="w-full flex flex-col justify-start items-center border border-slate-300 rounded">
      <div className="w-full flex justify-start items-center gap-2 px-4 py-1">
        <span className="shrink-0 w-36 font-medium">Product Name</span>
        <span className="font-medium">:</span>
        <span className="flex-1 line-clamp-1">
          {item?.product?.productName}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-2 px-4 py-1">
        <span className="shrink-0 w-36 font-medium">Price</span>
        <span className="font-medium">:</span>
        <span className="text-red-600">
          {item?.unitPrice?.toLocaleString()}
        </span>
        <span className="text-red-600">VNĐ</span>
      </div>
      <div className="w-full flex justify-start items-center gap-2 px-4 py-1">
        <span className="shrink-0 w-36 font-medium">Quantity</span>
        <span className="font-medium">:</span>
        <span className="flex-1 line-clamp-1">{item?.quantity}</span>
      </div>
      {status === "Completed" ? (
        <div className="w-full flex justify-start items-center gap-2 px-4 py-1">
          <div>
            <button
              onClick={() => setIsOpenModal(true)}
              className="px-2 py-1 bg-yellow-400 text-white rounded"
            >
              Rating
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <ModalRating
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        orderId={orderId}
        data={item}
      />
    </div>
  );
};

export default ProductInOrder;
