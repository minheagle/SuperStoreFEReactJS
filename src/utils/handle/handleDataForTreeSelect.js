const convertToTree = (data) => {
  // Tạo một map để lưu trữ các nút theo id
  const nodeMap = {};

  // Tạo cây gốc
  let rootNode = null;

  // Lặp qua danh sách dữ liệu ban đầu và tạo các nút
  data?.forEach((item) => {
    const { id, content, parentId } = item;
    const newNode = {
      label: content,
      value: id,
      children: [],
    };
    nodeMap[id] = newNode;

    // Nếu parentId là 0, đây là nút gốc
    if (parentId === 0) {
      rootNode = newNode;
    } else {
      // Nếu không, thêm nút này vào danh sách con của nút cha
      if (nodeMap[parentId]) {
        nodeMap[parentId]?.children.push(newNode);
      }
    }
  });

  return [rootNode]; // Trả về mảng chứa nút gốc
};

export default convertToTree;
