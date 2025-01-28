import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Step1 } from "./Step1";
const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  appearance: {
   
  },
};

export default function Step2() {
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <Step1 />
      </Elements>
    </div>
  );
}
