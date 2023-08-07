const Products = () => {
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
        </table>
        {/* <Paging /> */}
      </div>
    </div>
  );
};

export default Products;
