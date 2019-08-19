import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./Payment.scss";

toast.configure();

function Payment(){
    const [product] = React.useState({
        name: "Travel Destination",
        price: 800.00,
        description: "Travel package"
    })
    
    async function handleToken(token, addressess) {
        const response = await axios.post('https//localhost:4001/checkout', {
            token,
            product

        });
        const { status } = response.data
        if (status === 'success') {
            toast('Success! Check email for details', { type: "success"})
        } else {
            toast("Something went wrong", {type: "error"})
        }

    }

    return(
        <StripeCheckout
        stripeKey="pk_test_0RYqFUsl2inWUaQSlVjcSJVi00WuCfc6xU"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={product.price * 100}
        name={product.name}
        />
    )
}

export default Payment