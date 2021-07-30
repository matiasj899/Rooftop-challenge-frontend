import React from 'react'
const RandomItems=(shuffleItem:any)=>{
    console.log(shuffleItem)
    return(<div>
        <img src={shuffleItem.images[0]}></img>
    </div>)
}
export default RandomItems