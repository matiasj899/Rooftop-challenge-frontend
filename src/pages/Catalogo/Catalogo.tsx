import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import RandomItems from "../Home/RandomItems";
import clienteAxios from "../../config/axios";
import Footer from "../../components/Footer";
import "./Catalogo.css";
import Loader from "react-loader-spinner";

const Catalogo = (props: any) => {
  interface Product {
    id: string;
    title: string;
    images: [];
  }
  const [product, setProduct] = useState<Product[]>([]);
  const [spinner, setSpinner] = useState(true);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    clienteAxios
      .get("/items")
      .then((res) => {
        setProduct(res.data.items);
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadError(true);
      });
  }, []);

  const value = product.length;
  const limit = value / 5;
  let limitArray = [];
  const [currentPage, setCurrentPage] = useState(0);
  function changePageByNumber(e: any) {
    setCurrentPage(Number(e.target.value));
  }
  function prevPage() {
    setCurrentPage(currentPage - 1);
  }
  function nextPage() {
    setCurrentPage(currentPage + 1);
  }
  for (let index = 0; index < limit; index++) {
    limitArray.push(index);
  }
  let page = product.slice(0, 5);

  if (currentPage > 0) {
    const start = currentPage * 5;
    console.log(start)
    const end = start + 5;
    page = product.slice(start, end);
    console.log(page)
  }
  const showItems = page.map((productData) => {
    const itemId = productData.id.toString();

    return (
      <RandomItems key={itemId} {...productData} props={props}></RandomItems>
    );
  });

  return (
    <>
      <Header></Header>
      {spinner ? (
        <div className="spinner-cn">
 <Loader type="Circles" color="#ff642ac7" height={80} width={80} />
        </div>
       
      ) : (
        <>
          <h1 id="products-h1">Catalogo</h1>
          <div className="items-cn">{showItems}</div>
          <div id="buttons-cn">
            {currentPage === 0 ? null : (
              <button className="next-and-prev-btn" onClick={prevPage}>
                <span className="prevPage-icon"></span>
                Anterior
              </button>
            )}
            {limitArray.map((eachNumber) => {
              return (
                <button
                  className={
                    currentPage === eachNumber
                      ? "page-number active-btn"
                      : "page-number"
                  }
                  key={eachNumber}
                  value={Number(eachNumber)}
                  onClick={changePageByNumber}
                >
                  {eachNumber + 1}
                </button>
              );
            })}
            {currentPage === limitArray.length - 1 ? null : (
              <button className="next-and-prev-btn" onClick={nextPage}>
                Siguiente
                <span className="nextPage-icon"></span>
              </button>
            )}
          </div>
        </>
      )}
    {loadError?<p className='loadError'>Algo ha salido mal, recarga la pagina.</p>:null}
      <Footer></Footer>
    </>
  );
};

export default Catalogo;
