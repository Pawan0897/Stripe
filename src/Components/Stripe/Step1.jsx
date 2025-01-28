import { useState } from "react";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Header from "../Header";

export const Step1 = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    /******************************************************* */
    const { error: submitError } = await elements.submit();
    if (submitError) {
      /*****************************Error  ********************* */
      setErrorMessage(submitError.message);
      return;
    }

    /*****************************Use for Payment Intent *************** */
    const res = await fetch("/create-intent", {
      method: "POST",
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      /*********************************Use for payment element******** */
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      /***********Your customer will be redirected to your `return_url`. For some payment */
    }
  };

  return (<>
    <Header />
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3  ">
          <div className="stripe-card bg-light  p-4">
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              <button
                className="bg-warning btn fw-normal mt-3"
                type="submit"
                disabled={!stripe || !elements}
              >
                Pay
              </button>
              {/* Show error message to your customers */}
              {errorMessage && <div>{errorMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
