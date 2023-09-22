// import axios from "axios";
// import fs from "fs";

// const downloadImageFromCloudinary = async (
//   cloudinaryUrl,
//   folderPath,
//   fileName
// ) => {
//   try {
//     const response = await axios.get(cloudinaryUrl, { responseType: "stream" });

//     // Tạo thư mục nếu chưa tồn tại
//     if (!fs.existsSync(folderPath)) {
//       fs.mkdirSync(folderPath, { recursive: true });
//     }

//     // Tạo đường dẫn đầy đủ cho tệp
//     const filePath = `${folderPath}/${fileName}`;

//     // Sử dụng fs để tạo một luồng tệp và ghi dữ liệu từ phản hồi vào đó
//     const writer = fs.createWriteStream(filePath);
//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on("finish", () => {
//         resolve(filePath);
//       });
//       writer.on("error", (err) => {
//         reject(err);
//       });
//     });
//   } catch (error) {
//     console.error("Lỗi khi tải ảnh từ Cloudinary:", error);
//     throw error;
//   }
// };

// const imageApi = { downloadImageFromCloudinary };

// export default imageApi;
