import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../store/StateProvider'
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

import "./Payment.css"
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../store/reducer';
import axios from '../../axios';
import {db} from '../../firebase'

function Payment() {

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [{basket, user}, dispatch] = useStateValue();
    
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    

    useEffect(() => {
        const getClientSecret = async () => {
          const response = await axios({
            method: "post",
            url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
          });
          setClientSecret(response.data.clientSecret);
        };
    
        getClientSecret();
      }, [basket]);

    console.log("The secret is >>>" , clientSecret)
    console.log("person",  user )


    const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
        
      })
      .then(({ paymentIntent }) => {
        // Payment Intent is Payment Confirmation
        
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      })
      .catch(error => console.log(error));
      console.log("payload >>>", payload)
      
  };

  const handleChange = e => {
    //listen for changes in the cardelements
    //and display error customer types their card details
   setDisabled(e.empty);
   setError(e.error ? e.error.messeage : "" );
}

    return (
        <div className="payment">
            <div className="payment-container">
                <h1>
                    checkout(
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>

                <div className="payment-section">
                      <div className="payment-title">
                          <h3> Delivery Address</h3>
                          </div>

                       <div className="payment-address">
                          <p>{user?.email}</p>
                          <p>123 React Lane</p>
                          <p>los Angeles, CA</p>
                        </div>     
                </div>
                <div className="payment-section">
                   <div className="payment-title">
                       <h3>Review items and Delivery</h3>
                    </div>

                    <div className="payment-items">
                        {basket.map(item => (
                            <CheckoutProduct 
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            rating={item.rating}
                            price={item.price}
                            />
                        ))}
                        </div> 
                </div>
                <div className="payment-section">
                   <div className="payment-title">
                       <h3>Payment Method</h3>
                    </div>

                    <div className="payment-detail">
                        {/* stripe magic will go here */}
                        <form onSubmit={handleSubmit}>
                          <CardElement onChange={handleChange} />
                          <div className="payment-price">
                              <CurrencyFormat 
                              renderText={(value) => (
                              <h3>Order Total: {value}</h3>
                              )}
                              decimalScale={2}
                              value={getBasketTotal(basket)}
                              displayType={"text"}
                              thousandSeperator={true}
                              prefix={"$"}
                              /> 

                            <button disabled={processing || disabled || succeeded }>
                              <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                            </button>
                          </div>
                          {/* Error */}
                              {error && <div>{error}</div>}
                        </form>
                    </div>

            </div>
            </div>
            
        </div>
    )
}

export default Payment
