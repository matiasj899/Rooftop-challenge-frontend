import React from "react";
const RandomItems = (shuffleItem: any) => {
  
  function toProductDetail() {
    const productId = shuffleItem.id;
    shuffleItem.props.history.push(`/producto/${productId}`);
  }
  return (
    <div className="randomItems" onClick={toProductDetail}>
      <img src={shuffleItem.images[0]} alt={shuffleItem.title}></img>
      <div>
        <h2>{shuffleItem.title}</h2>
        {shuffleItem.offer !== null ? (
                <>
                  <p className="before-price">
                    <span>{shuffleItem.currency}</span>
                    {shuffleItem.price}
                  </p>
                  <p className="sale-price">
                    <span>{shuffleItem.currency}</span>
                    {shuffleItem.offer.price}
                  </p>
                 
                </>
              ) : (
                <p> <span>{shuffleItem.currency}</span>{shuffleItem.price} </p>
              )}


        {/*shuffleItem.offer !== null ? (
          <p>{shuffleItem.currency + shuffleItem.offer.price}</p>
        ) : (
          <p className="sale-price">
            {shuffleItem.currency + shuffleItem.price}
          </p>
        )*/}
      </div>
    </div>
  );
};
export default RandomItems;
