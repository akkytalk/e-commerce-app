import React, { useEffect, useState } from "react";

import { products } from "./productData";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../store/StateProvider";
import ClearIcon from "@material-ui/icons/Clear";
import Modal from "@material-ui/core/Modal";

import "./ProductDetail.css";
import "./Products.css";

function ProductDetail(props) {
  const { id } = useParams();
  const [product, setProduct] = React.useState([]);
  const [, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="modal">
      <img src={product?.image} className="modal-image" alt="" />
      <div className="modal-info">
        <p>{product?.title}</p>
        <p className="modal-price">
          <small>$</small>
          <strong>{product?.price}</strong>
        </p>
        <div className="products-rating">
          {Array(product?.rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <ClearIcon className="modal-clear" onClick={handleClose} />
    </div>
  );

  React.useEffect(() => {
    const product = products
      .flatMap((item) => item.row)
      .find((item) => item.id == id);
    setProduct(product);
  }, [id]);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: product.title,
        image: product.image,
        rating: product.rating,
        price: product.price,
      },
    });

    setOpen(true);
  };

  // console.log("product", product);
  return (
    <div className="product-detail">
      <div className="product-detail-image">
        <img src={product?.image} alt="" />
      </div>
      <div className="product-detail-info">
        <h2>{product?.title}</h2>
        <h2 className="products-rating info-rating">
          {Array(product?.rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </h2>
        <div className="product-detail-cart">
          <h3 className="products-price detail-price">
            <small>$</small>
            <strong>{product?.price}</strong>
          </h3>
          <button onClick={addToBasket}> Add to basket</button>
        </div>
        <div className="product-detail-desc">
          <h3>Description: </h3>
          <p>{product?.desc}</p>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          disableBackdropClick={true}
          hideBackdrop={true}
        >
          {body}
        </Modal>
      </div>
    </div>
  );
}

export default ProductDetail;
