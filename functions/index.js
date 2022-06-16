const functions = require('firebase-functions');
const express = require('express');

const cors = require('cors');

const stripe = require("stripe")('sk_test_51HwQmnHMlL9H3i9KojMHREX26EaFLqggnlzPjQ97SM2rShcRRrzxF7TQL6ki6RIGfsHhlVib2djfIxa5sQlvI5W800UGsEPf5s');


// API

// - API config

const app = express();

// - Middlewares

app.use(cors({origin:true}));
app.use(express.json());

// - API Routes

app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("Payment request recieved BOOM!!! for this ammount >>> ", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr"
    })
    
   // console.log("paymentIntent >>>", paymentIntent)
    // ok - Created

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// - Listen Command

exports.api = functions.https.onRequest(app)

//example Endpoint
// http://localhost:5001/clone-7bbca/us-central1/api