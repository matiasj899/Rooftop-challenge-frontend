import React from "react";
import ImageGallery from "react-image-gallery";

const images: Array<any> = [
  {
    original: "./images/banner_1.jpg",
  },
  {
    original: "./images/banner_2.jpg",
  },
];
const Banner = () => {
  return <ImageGallery items={images}></ImageGallery>;
};

export default Banner;
