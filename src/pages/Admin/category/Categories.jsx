import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ROUTES from "../../../constants/ROUTES.js";

import Table from "../../../components/common/Table.jsx";

const Categories = () => {
  const navigate = useNavigate();

  const columns = [
    {
      key: "id",
      title: "Id",
      layout: 10,
    },
    {
      key: "name",
      title: "Name",
      layout: 10,
    },
    {
      key: "email",
      title: "Email",
      layout: 20,
    },
    {
      key: "date",
      title: "Date",
      layout: 20,
    },
    {
      key: "status",
      title: "Status",
      layout: 20,
    },
    {
      key: "actions",
      title: "Actions",
      layout: 20,
      render: (record) => {
        return (
          <div className="w-full flex justify-around items-center">
            <button>View</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        );
      },
    },
  ];

  const dataSource = [
    {
      id: 23123,
      name: "Jude abaga",
      email: "jude.abaga@abaga.com",
      date: 1237682923189813,
      status: "pending",
    },
    {
      id: 23128,
      name: "Dev abaga",
      email: "devabaga@abaga.com",
      date: 111237682923189813,
      status: "verified",
    },
  ];

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
              onClick={() => navigate(ROUTES.ADMIN.CATEGORIES.CREATE)}
              className="w-24 h-10 text-white bg-slate-500 rounded"
            >
              Create
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          styleHead="w-full bg-slate-300 rounded"
          styleCellHead="border border-slate-500"
          styleCellBody="border border-slate-500"
          className="w-full border-collapse border border-slate-500"
        />
        {/* <Paging /> */}
      </div>
    </div>
  );
};

export default Categories;
