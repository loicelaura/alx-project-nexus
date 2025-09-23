import React, { useEffect} from 'react';
import type { Product } from '../types';

interface ConfirmationPageProps {
  order: Product[];
  total: number;
  onGoBackToShopping: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ order, total, onGoBackToShopping }) => {

   useEffect(() => {
    // Set a timeout to automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      onGoBackToShopping();
    },50000); 

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
   }, [onGoBackToShopping]);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto my-8">
      <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">
        Order Confirmed!
      </h2>
      <p className="text-center text-gray-700 mb-6">
        Thank you for your purchase. Your order details are below.
      </p>
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Summary</h3>
        <ul className="space-y-2">
          {order.map((item, index) => (
            <li key={index} className="flex justify-between items-center text-gray-600">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center text-lg font-bold text-gray-800 mt-6 pt-4 border-t-2 border-gray-200">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
         onClick={onGoBackToShopping}
          className="w-full mt-6 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Go Back to Shopping
      </button>
    </div>
  );
};

export default ConfirmationPage;