import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Header from "../../components/Header";
import ProductImages from "./ProductImages";
import ImageGallery from "react-image-gallery";
import './Producto.css'
const Producto = (props: any) => {
  const productId = props.match.params.id;
  const Product = {
    images: [],
    id: "",
    currency: "",
    features: [],
    title: "",
    price: "",
    offer: {price:null},
  };
  const [products, setProducts] = useState(Product);
  useEffect(() => {
    clienteAxios
      .get(`/items/${productId}`)
      .then((res) => {
        console.log(res);
        setProducts({ ...Product, ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  console.log(products);
  {
    /*const images: Array<any> = [
    {
      original: products.images,
    },
    {
      original: products.images,
    },
    {
      original: products.images,
    },
  ];*/
  }
  let images: any = [];
  const newImagesArray = products.images.forEach((image) =>
    images.push({ original: image })
  );
  return (
    <>
      <Header></Header>
      <div id='productDetail-cn'>
        <div className='productDetail-img-info-cn'>
          <div className="imageGallery-cn">
            <ImageGallery
              showPlayButton={false}
              autoPlay={true}
              showBullets={true}
              showThumbnails={false}
              items={images}
            ></ImageGallery>
          </div>
          <div className="productDetail-info-cn">
          <h2>{products.title}</h2>
          {products.offer!==null?<div>
            <p className='before-price'>{products.price}</p>
            <p>{products.offer.price}</p></div>:<p>{products.price}</p>}
          </div>
          
        </div>
      </div>
    </>
  );
};
export default Producto;
