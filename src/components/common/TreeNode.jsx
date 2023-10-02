import React from "react";

const TreeNode = ({ node, data }) => {
  const children = data?.filter((item) => item.parentId === node.id);
  return (
    <div className="">
      <h2>{node.content}</h2>
      <div className="w-32 h-32">
        <img
          src={node.imageUrl}
          alt={node.content}
          className="object-cover w-32  h-32 rounded-full"
        />
      </div>
      <p>
        Left: {node.left}, Right: {node.right}
      </p>
      <ul>
        {children?.map((child) => (
          <li key={child.id}>
            <TreeNode node={child} data={data} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreeNode;
