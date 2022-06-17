import React from "react";

import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { getBasketTotal } from "../../../store/reducer";
import { useStateValue } from "../../../store/StateProvider";

import "./Subtotal.css";
function Subtotal() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const checkout = () => {
    if (user && basket) {
      history.push("/payment");
    } else {
      dispatch({
        type: "SET_AUTH_REDIRECT_PATH",
        path: "/payment",
      });
      history.push("/login");
    }
  };

  const getBasketTotalqty = (basket) =>
    basket?.reduce((amount, item) => Number(item.quantity) + amount, 0);

  console.log("basket", basket);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getBasketTotalqty(basket.length > 0 ? basket : [])}{" "}
              items) : <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" /> this order contains gifts
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      {/* <button onClick={checkout} disabled={basket.length === 0}>
        Proceed to Checkout
      </button> */}
      {/* <button onClick={e => user ? history.push('/payment'): history.push('/login') }>Proceed to Checkout</button> */}
    </div>
  );
}

export default Subtotal;
