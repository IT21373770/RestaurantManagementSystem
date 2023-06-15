import React, {useState, useEffect} from 'react'
import { MdFavorite } from 'react-icons/md';

export default 
function MenuItem({product, addProductToCart, productsInCart}) {
    // console.log(productsInCart);
    const [inCart, setInCart] = useState(false)

    useEffect(()=> {
        if(productsInCart.length > 0){
            setInCart(productsInCart.some(cartItem => cartItem._id === product._id));
        }
        else{
           setInCart(false)
        }
    }, [productsInCart])

   

  return (
    <div className="food-items">
        <div className="image">
            <img src={product.ImageURL} alt="menu"/>
        </div>
        <div className="details">
            <div className="details-sub">
            <h5>{product.Name}</h5>
            <h5 class="price">Rs.{product.Price}</h5>
            </div>

            <bottom>
                <button onClick={() =>{!inCart ? addProductToCart(product) : console.log("hey");}}>Add To Cart</button>
            </bottom>
        </div>
    </div>
  )
}
