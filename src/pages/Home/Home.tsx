import React, { useState, useEffect } from "react";
import "./Home.css";
import clienteAxios from "../../config/axios";
import Loader from "react-loader-spinner";
import Header from "../../components/Header";
import Banner from "./Banner";
import _ from "underscore";
import RandomItems from "./RandomItems";
import Footer from "../../components/Footer";
const Home = (props: any) => {
  interface Item {
    id: string;
    title: string;
    images: [];
  }
  const [randomItems, setRandomItems] = useState<Item[]>(
    []
  );
  const [spinner,setSpinner]=useState(true)
  const [loadError,setLoadError]=useState(false)
  useEffect(() => {
    clienteAxios
      .get("/items")
      .then((res) => {
        setRandomItems(res.data.items);
        setSpinner(false)
      })
      .catch((error) => {
        setLoadError(true)
      });
  }, []);
  const shuffleItems = _.shuffle(randomItems);
  const sliceShuffleItems = shuffleItems.slice(0, 4);
  const showRandomItems = sliceShuffleItems.map((shuffleItem) => {
    const itemId = shuffleItem.id.toString();

    return (
      <RandomItems key={itemId} {...shuffleItem} props={props}></RandomItems>
    );
  });
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <h2 id="subtitle">Destacados</h2>
      <div id="randomItems-cn">
        {spinner? <Loader type="Circles" color="#ff642ac7" height={80} width={80}/>:showRandomItems}
        
        </div>
        {loadError?<p className='loadError'>Algo ha salido mal, recarga la pagina.</p>:null}
      <Footer></Footer>
    </>
  );
};

export default Home;
