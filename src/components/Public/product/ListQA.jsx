import QAItem from "./QAItem";

const ListQA = ({ listQA = [], productId, userId }) => {
  const handleRenderListQA = (data = []) => {
    return data?.map((item) => {
      return (
        <div className="w-full border border-slate-300 rounded px-4 py-2">
          <QAItem
            key={item.id}
            item={item}
            productId={productId}
            userId={userId}
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      {handleRenderListQA(listQA)}
    </div>
  );
};

export default ListQA;
