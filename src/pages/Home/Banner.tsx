import React from "react";
import ImageGallery from "react-image-gallery";

const images: Array<any> = [
  {
    original: "./images/banner_1.jpg",
  },
  {
    original: "./images/banner_2.jpg",
  },
  {
    original: "./images/banner_3.jpg",
  },
];
const Banner = () => {
  return (<div>
<ImageGallery showFullscreenButton={false} showPlayButton={false} autoPlay={true} showBullets={true} showThumbnails={false} items={images} ></ImageGallery>
  </div>)
  
};

export default Banner;
