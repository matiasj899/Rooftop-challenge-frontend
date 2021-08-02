import React, { useState, useEffect } from "react";
import './Home.css'
import clienteAxios from "../../config/axios";

import Header from "../../components/Header";
import Banner from "./Banner";
import _, { shuffle } from "underscore";
import RandomItems from "./RandomItems";
import Footer from "../../components/Footer";
const Home = () => {
  interface Item {
    id: string;
    title: string;
    images: []
  }
  const [randomItems, setRandomItems] = useState<Item[]>(
    []
    /*{[
    { id:String,title: "" },
    { id:String,title: "" },
    { id:String,title: "" },
  ]}*/
  );
  useEffect(() => {
    clienteAxios
      .get("/items")
      .then((res) => {
        console.log(res);
        setRandomItems(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const shuffleItems = _.shuffle(randomItems);
  const sliceShuffleItems = shuffleItems.slice(0, 4);
  const showRandomItems = sliceShuffleItems.map((shuffleItem) => {

    const itemId = shuffleItem.id.toString();
    console.log(itemId);
    return <RandomItems key={itemId} {...shuffleItem}></RandomItems>;
  });
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <h2 id='subtitle'>Destacados</h2>
      <div id="randomItems-cn">
      {showRandomItems}
      </div>
     <Footer></Footer>
    </>
  );
};

export default Home;
