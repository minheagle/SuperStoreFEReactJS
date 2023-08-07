import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { getAllUser } from "../../../redux/slice/userForAdmin.slice";

import Paging from "../../../components/Admin/Paging";
import ROUTES from "../../../constants/ROUTES";

const Users = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.UserForAdmin.list
  );

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleRenderUserList = () => {
    return data?.map((item) => {
      return (
        <tr key={item._id} className="h-10">
          <td className="p-2 border border-slate-500">{item.fullName}</td>
          <td className="text-center border border-slate-500">{item.phone}</td>
          <td className="p-2 border border-slate-500">{item.email}</td>
          <td className="text-center border border-slate-500">{item.role}</td>
          <td className="border border-slate-500">
            <div className="w-full flex justify-around items-center">
              <Link
                to={item._id}
                state={{ userId: item._id }}
                className="w-1/4 text-center text-white bg-green-600 rounded"
              >
                View
              </Link>
              <Link
                to={generatePath(ROUTES.ADMIN.USERS.EDIT, { id: item._id })}
                state={{ userId: item._id }}
                className="w-1/4 text-center text-white bg-yellow-400 rounded"
              >
                Edit
              </Link>
              <button className="w-1/4 text-white bg-red-500 rounded">
                Delete
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="w-full flex flex-col justify-center items-center bg-white rounded p-8">
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
          <tbody>{handleRenderUserList()}</tbody>
        </table>
        <Paging />
      </div>
    </div>
  );
};

export default Users;
