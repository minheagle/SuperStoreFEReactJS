import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const BreadCum = () => {
  let location = useLocation();
  const locations = location.pathname.split("/").filter((x) => x);
  useEffect(() => {
    document.title = locations[locations.length - 1];
  }, [location.pathname]);

  return (
    <div className="w-full h-10 flex justify-start items-center bg-white border-t-2 pl-4">
      <div className="flex justify-start items-center">
        {locations?.map((name, index) => {
          let isEnd = index === locations.length - 1;
          return isEnd ? (
            <div key={index}>
              <span className="capitalize">{name}</span>
            </div>
          ) : (
            <div key={index}>
              <span className="capitalize">{name}</span>
              <span className="mx-2">{">"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCum;
