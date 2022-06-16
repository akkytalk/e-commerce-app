import React, { useEffect, useState } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import Modal from "@material-ui/core/Modal";
import { useStateValue } from "../../store/StateProvider";
import ClearIcon from "@material-ui/icons/Clear";

import "./Products.css";

function Products({ id, title, image, rating, price, redirectToDetailPage }) {
  const [, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  // const [modalStyle] = useState(getModalStyle);

  // function getModalStyle() {
  //     const top = 10 ;
  //     const right = 1 ;

  //     return {
  //       top: `${top}%`,
  //       right: `${right}%`,
  //       transform: `translate(-${top}%, ${right}%)`,
  //     };
  //   }

  //   const useStyles = makeStyles((theme) => ({
  //     paper: {
  //         display:"flex",
  //       position: 'absolute',
  //       top: "75px",
  //       right:"25px",
  //       width:"300px",
  //       height:"120px",
  //       backgroundColor: theme.palette.background.paper,
  //       border: '2px solid #000',
  //       boxShadow: theme.shadows[5],
  //       padding:"10px",
  //       fontSize:"12px"

  //     },
  //   }));

  //  const classes = useStyles();

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
      <img src={image} className="modal-image" alt="" />
      <div className="modal-info">
        <p>{title}</p>
        <p className="modal-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="products-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <ClearIcon className="modal-clear" onClick={handleClose} />
    </div>
  );

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        rating: rating,
        price: price,
      },
    });

    setOpen(true);
  };
  return (
    <CSSTransition key={id} timeout={200} classNames="">
      <div className="products">
        <div className="products-info" onClick={redirectToDetailPage}>
          <p>{title}</p>
          <p className="products-price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="products-rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p>🌟</p>
              ))}
          </div>
        </div>

        <img src={image} alt="" onClick={redirectToDetailPage} />

        <button onClick={addToBasket}> Add to basket</button>

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
    </CSSTransition>
  );
}

export default Products;
