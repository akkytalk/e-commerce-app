import React from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

import Products from "./Products/Products";
import Slide from "./SlideShowImages/Slide";
import { products } from "./Products/productData";

// make JSON of all the products

function Home() {
  const history = useHistory();

  const redirectToDetailPage = (product) => {
    history.push(`/product-detail/${product.id}`);
  };
  return (
    <div className="home">
      <div className="home-container">
        <Slide />
        {/* <img className="home-image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""  /> */}
      </div>
      {products.length > 0
        ? products.map((row, index) => {
            return (
              <div className="home-row" key={index}>
                {row.row.length > 0
                  ? row.row.map((product, pIndex) => {
                      return (
                        <Products
                          id={product.id}
                          title={product.title}
                          price={product.price}
                          rating={product.rating}
                          image={product.image}
                          key={pIndex}
                          redirectToDetailPage={() =>
                            redirectToDetailPage(product)
                          }
                        />
                      );
                    })
                  : "no products"}
              </div>
            );
          })
        : "No Porducts"}
    </div>
  );
}

export default Home;
