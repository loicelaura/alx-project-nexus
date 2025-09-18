
interface Product {
  name: string;
  price: number;
  image: string;
}

interface CartModalProps {
  cart: Product[];
  onClose: () => void;
}

const CartModal = ({ cart, onClose }: CartModalProps) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="font-bold text-green-600">${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="mt-6 pt-4 border-t-2 border-gray-200">
          <div className="flex justify-between items-center text-lg font-bold text-gray-800">
            <span>Total:</span>
            <span>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-green-500 text-white font-bold py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
            Checkout
          </button>
        </div>
      )}
    </div>
  </div>
);

export default CartModal;