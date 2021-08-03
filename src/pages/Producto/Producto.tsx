import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import Header from "../../components/Header";

import ImageGallery from "react-image-gallery";
import "./Producto.css";
const Producto = (props: any) => {
  const productId = props.match.params.id;
  const Product = {
    images: [],
    id: "",
    currency: "",
    features: [{ key: "", name: "", value: "" }],
    title: "",
    price: "",
    offer: { price: null },
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

  let images: any = [];
  const newImagesArray = products.images.forEach((image) =>
    images.push({ original: image })
  );
  const features = products.features.map((feature) => {
    return (
      <tr key={feature.key}>
        <th>{feature.name}</th>
        <td>{feature.value}</td>
      </tr>
    );
  });
  return (
    <>
      <Header></Header>
      <div id="productDetail-cn">
        <div className="productDetail-img-info-cn">
          <div className="imageGallery-cn">
            <ImageGallery
              showPlayButton={false}
              autoPlay={true}
              showBullets={true}
              showThumbnails={false}
              items={images}
            ></ImageGallery>
            <div className="productDetail-info-cn">
              <h2>{products.title}</h2>
              {products.offer !== null ? (
                <div>
                  <p className="before-price">
                    <span>{products.currency}</span>
                    {products.price}
                  </p>
                  <p className="sale-price">
                    <span>{products.currency}</span>
                    {products.offer.price}
                  </p>
                </div>
              ) : (
                <p>{products.price}</p>
              )}
              <button>Comprar ahora</button>
            </div>
          </div>
          <div className="features-cn">
            <h3>Caracteristicas principales</h3>
            <table>
              <tbody>{features}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Producto;
