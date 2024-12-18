import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { useCreateStripePaymentIntentMutation } from "@/state/api";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import Loading from "@/components/loading";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#18181b",
    colorText: "#d2d2d2",
    colorDanger: "#df1b41",
    colorTextPlaceholder: "#6e6e6e",
    fontFamily: "Inter, system-ui, sans-serif",
    spacingUnit: "3px",
    borderRadius: "10px",
    fontSizeBase: "14px",
  },
};

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
    const [clientSecret, setClientSecret] = useState<string | "">("");
    const [error, setError] = useState<string | null>(null);
    const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
    const { course } = useCurrentCourse();
  
    useEffect(() => {
      if (!course) return;
      
      const fetchPaymentIntent = async () => {
        try {
          const result = await createStripePaymentIntent({
            amount: course?.price ?? 0, 
          }).unwrap();
  
          if (result?.clientSecret) {
            setClientSecret(result.clientSecret);
          } else {
            setError('No client secret received');
          }
        } catch (err) {
          setError('Failed to create payment intent');
          console.error('Payment intent error:', err);
        }
      };
  
      fetchPaymentIntent();
    }, [createStripePaymentIntent, course?.price, course]);
  
    const options: StripeElementsOptions = {
      clientSecret,
      appearance,
    };
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!clientSecret) return <Loading />;
  
    return (
      <Elements stripe={stripePromise} options={options} key={clientSecret}>
        {children}
      </Elements>
    );
  };

  export default StripeProvider;