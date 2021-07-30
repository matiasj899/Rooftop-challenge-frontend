import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";

import Header from "../../components/Header";
import Banner from "./Banner";
import _,{shuffle} from 'underscore';
const Home = () => {
  const [randomItems,setRandomItems]=useState([{title:''},{title:''},{title:''}])
  useEffect(() => {
    clienteAxios
      .get("/items")
      .then((res) => {
        console.log(res);
        setRandomItems(res.data.items)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const shuffleItems=_.shuffle(randomItems)
  const sliceShuffleItems=shuffleItems.slice(0,4)
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      {sliceShuffleItems.map((shuffleItem)=>{
        
        return <div>
          <h1>{shuffleItem.title}</h1>
        </div>
      })}
    </>
  );
};

export default Home;
