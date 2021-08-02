import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Header from "../../components/Header";
import ProductImages from "./ProductImages";
import ImageGallery from "react-image-gallery";

const Producto = (props: any) => {
  const productId = props.match.params.id;
  const Product = {
    images: [],
    id: "",
    currency: "",
    features: [],
    title: "",
    price: "",
    offer: {},
  };
  const [products, setProducts] = useState(Product);
  useEffect(() => {
    clienteAxios
      .get(`/items/${productId}`)
      .then((res) => {
        console.log(res);
        setProducts({...Product,...res.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  console.log(products);
  {/*const images: Array<any> = [
    {
      original: products.images,
    },
    {
      original: products.images,
    },
    {
      original: products.images,
    },
  ];*/}
  let images:any=[]
  const newImagesArray=products.images.forEach(image=>images.push({original:image}))
  return (
    <>
      <Header></Header>

      <h1>{products.title}</h1>
      <div>

      <ImageGallery
        
        showPlayButton={false}
        autoPlay={true}
        showBullets={true}
        showThumbnails={false}
        items={images}
      ></ImageGallery>
      </div>

    </>
  );
};
export default Producto;
