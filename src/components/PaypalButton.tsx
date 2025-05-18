'use client';

import { useEffect } from 'react';

interface PaypalButtonProps {
  packageName: string;
  price: number;
}

const PaypalButton = ({ packageName, price }: PaypalButtonProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AUp5XrAdGdn4n3KCyuysRTDTOph_myC8yqDgTAZ8mSRv92PT7ZMb5lzhfP0F0lMhyNgYX76r-SEhuUEO`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price.toString(),
                  },
                  description: `Booking for ${packageName}`,
                },
              ],
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
            });
          },
          onError: (err: any) => {
            console.error('PayPal error: ', err);
            alert('There was an error processing the payment.');
          },
        }).render('#paypal-button-container');
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [packageName, price]);

  return <div id="paypal-button-container" className="py-6" />;
};

export default PaypalButton;
