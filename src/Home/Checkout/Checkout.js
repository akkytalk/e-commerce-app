import React from "react";
import { useStateValue } from "../../store/StateProvider";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
import Subtotal from "./Subtotal/Subtotal";

function Checkout() {
  // eslint-disable-next-line no-unused-vars
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          className="checkout-ad"
          src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
          alt=""
        />
        <div>
          <h3 className="checkout-email">Hello, {user?.email}</h3>
          <h2 className="checkout-title">Your shopping Basket</h2>

          <TransitionGroup>
            {basket.map((item) => (
              <CSSTransition
                key={item.id}
                timeout={2000}
                classNames="fade"
                mountOnEnter
                unmountOnExit
              >
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  title={item.title}
                  quantity={item.quantity}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>

      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
