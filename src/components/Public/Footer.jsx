import data from "./data.footer";

const Footer = () => {
  const handleRenderCustomerService = () => {
    return data.customer_service.map((item) => {
      return (
        <div key={item.id}>
          <span className="font-light text-sm">{item.content}</span>
        </div>
      );
    });
  };

  const handleRenderAboutSuperStore = () => {
    return data.about_super_store.map((item) => {
      return (
        <div key={item.id}>
          <span className="font-light text-sm">{item.content}</span>
        </div>
      );
    });
  };

  return (
    <div className="w-full grid grid-cols-12 bg-slate-100 mt-4">
      <div className="col-span-1"></div>
      <div className="col-span-10 grid grid-cols-5 pt-4 pb-4">
        <div className="col-span-1 w-full flex flex-col justify-start items-start gap-4">
          <h2 className="font-semibold text-sm">CUSTOMER SERVICE</h2>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            {handleRenderCustomerService()}
          </div>
        </div>
        <div className="col-span-1 w-full flex flex-col justify-start items-start gap-4">
          <h2 className="font-semibold text-sm">CUSTOMER SERVICE</h2>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            {handleRenderAboutSuperStore()}
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Footer;
