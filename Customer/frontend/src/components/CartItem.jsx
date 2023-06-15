import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
export default function CartItem({product, onProductRemove, onQuantityChange}) {
  return (
    <div
        className="cart-product"
        key={product._id}>
        <img
            src={
                product.ImageURL
            }
            alt={product.Name}
        />
        <div className="product-info">
            <h3>
                {product.Name}
            </h3>
            <span className="product-price">
                Rs. {product.Price *
                    product.count}
                
            </span>
        </div>
        <input type= "number" className="count" min="1" max="100" pattern="[0-9]"
            value={
                product.count
            }
            onChange={(
                event
            ) => {
                onQuantityChange(
                    product._id,
                    event
                        .target
                        .value
                );
            }}>
          
        </input>
        <button
            className="btn remove-btn"
            onClick={() =>
                {onProductRemove(
                    product._id
                )}
            }>
            <RiDeleteBin6Line
                size={20}
            />
        </button>
    </div>
  )
}
