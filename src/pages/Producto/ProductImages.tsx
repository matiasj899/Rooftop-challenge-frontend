import ImageGallery from "react-image-gallery";
const ProductImages = (productsImg:any) => {
  console.log(productsImg)
    return (<div>
  <ImageGallery showFullscreenButton={false} showPlayButton={false} autoPlay={true} showBullets={true} showThumbnails={false} items={productsImg} ></ImageGallery>
    </div>)
    
  };

  export default ProductImages