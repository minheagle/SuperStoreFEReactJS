import React from "react";
import TreeNode from "./TreeNode";

const TreeView = ({ data }) => {
  const rootNodes = data.filter((item) => item.parentId === 0);

  return (
    <div className="w-full">
      {rootNodes.map((root) => (
        <TreeNode key={root.id} node={root} data={data} />
      ))}
    </div>
  );
};

export default TreeView;
