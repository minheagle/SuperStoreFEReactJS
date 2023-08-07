import { Outlet } from "react-router-dom";
import Header from "../components/Public/Header";
import Footer from "../components/Public/Footer";

const Public = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <Header />
      <div className="w-full grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-10">
          <Outlet />
        </div>
        <div className="col-span-1"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Public;
