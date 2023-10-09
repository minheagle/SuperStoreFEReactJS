import { Outlet } from "react-router-dom";
import Header from "../components/Public/Header";
import Footer from "../components/Public/Footer";
import Chat from "../components/common/Chat";

const Public = () => {
  return (
    <div className="relative w-full flex flex-col justify-start items-center">
      <Header />
      <Outlet />
      <Footer />
      <Chat />
    </div>
  );
};

export default Public;
