import React, { useEffect } from "react";
import Home from "./Home/Home";
import "./App.css";
import Header from "./Header/Header";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Home/Checkout/Checkout";
import Login from "./Login/Login";
import { useStateValue } from "./store/StateProvider";
import { auth } from "./firebase";
import Payment from "./Home/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Home/Payment/Orders/Orders";
import Footer from "./Footer/Footer";
import ProductDetail from "./Home/Products/ProductDetail";

const promise = loadStripe(
  "pk_test_51HwQmnHMlL9H3i9KpvtopHZzn3tKcMshdWsrcsWmKYR3E1W3oDCyIwyMwosPQFCSc3MklLolXLJU9eGt7bA06oiW00MOgPxjrp"
);

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>>", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/product-detail/:id">
            <Header />
            <ProductDetail />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
