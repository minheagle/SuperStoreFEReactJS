import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ROUTES from "../../../constants/ROUTES";

const Products = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center gap-4 bg-white rounded p-8">
        <div className="w-full flex justify-between items-center">
          <div className="w-1/3 flex justify-center items-center border rounded">
            <FontAwesomeIcon
              icon="fas fa-search"
              className="w-1/12 px-2 text-slate-500"
            />
            <input type="text" className="w-9/12" />
            <div className="w-2/12 p-1">
              <button className="w-full bg-slate-500 text-white rounded">
                Search
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={() => navigate(ROUTES.ADMIN.PRODUCTS.CREATE)}
              className="w-24 h-10 text-white bg-slate-500 rounded"
            >
              Create
            </button>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-slate-600 text-white">
            <tr className="h-12">
              <th className="w-3/12 border border-slate-500">Full Name</th>
              <th className="w-2/12 border border-slate-500">Phone Number</th>
              <th className="w-3/12 border border-slate-500">Email</th>
              <th className="w-1/12 border border-slate-500">Role</th>
              <th className="w-3/12 border border-slate-500">Action</th>
            </tr>
          </thead>
        </table>
        {/* <Paging /> */}
      </div>
    </div>
  );
};

export default Products;
