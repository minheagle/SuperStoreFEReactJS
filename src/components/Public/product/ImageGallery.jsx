import React from "react";
import Gallery from "react-image-gallery";

const ImageGallery = ({ listImage = [] }) => {
  const handleListImage = () => {
    return listImage?.map((item) => {
      const image = {
        original: item,
        thumbnail: item,
      };
      return image;
    });
  };
  return (
    <div className="w-full">
      <Gallery items={handleListImage()} autoPlay={true} />
    </div>
  );
};

export default ImageGallery;
