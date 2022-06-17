import React from "react";
import { useState } from "react";
import { useStateValue } from "../../../store/StateProvider";

import "./CheckoutProduct.css";

function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  hideButton,
  quantity,
}) {
  const [, dispatch] = useStateValue();
  const [quantityCheck, setQuantityCheck] = useState(quantity);

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutproduct">
      <img className="checkoutproduct-image" src={image} alt="" />
      <div className="checkoutproduct-info">
        <p className="checkoutproduct-title">{title}</p>
        <p className="checkoutproduct-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="">
          <p>Qty</p>
          <input
            type="number"
            min="1"
            max="10"
            value={quantityCheck}
            onChange={(e) => {
              setQuantityCheck(e.target.value);
              dispatch({
                type: "REPLACE_QUANTITY",
                item: {
                  id: id,
                  quantity: e.target.value,
                },
              });
            }}
          />
        </div>

        <div className="checkoutproduct-rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}> Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
