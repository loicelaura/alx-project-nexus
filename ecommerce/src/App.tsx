import  { useState } from "react";
import HeroSection from "./components/HeroSection";
import CartModal from "./components/CartModal";
import ProductList from "./components/ProductList";

interface Product {
  name: string;
  price: number;
  image: string;
}


const App = () => {
  const heroImageUrl =
    'https://images.unsplash.com/photo-1586090643003-b2bfb4fbd833?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0';

    // State to hold the items in the shopping cart.
  const [cart, setCart] = useState<Product[]>([]);

  // State to control the visibility of the cart modal.
  const [showCart, setShowCart] = useState(false);
    // An array of product objects to display.
    const products: Product[] = [
   { name: 'Fresh Apples', price: 1.25, image: 'https://images.unsplash.com/photo-1683688684067-b87a189c7503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEZyZXNoJTIwQXBwbGVzfGVufDB8fDB8fHww' },
  { name: 'Organic Bananas', price: 0.99, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop' },
  { name: 'Sweet Tomatoes', price: 2.50, image: 'https://images.unsplash.com/photo-1570543375343-63fe3d67761b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3dlZXQlMjBUb21hdG9lc3xlbnwwfHwwfHx8MA%3D%3D'},
  { name: 'Red Cherries', price: 4.00, image: 'https://images.unsplash.com/photo-1687029968603-904d3833b50f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFJlZCUyMENoZXJyaWVzfGVufDB8fDB8fHww' },
  { name: 'Avocados', price: 2.75, image: 'https://images.unsplash.com/photo-1590005024862-6b67679a29fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEF2b2NhZG9zfGVufDB8fDB8fHww' },
  { name: 'Potatoes', price: 1.50, image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFBvdGF0b2VzfGVufDB8fDB8fHww'},
];

  // Function to add a product to the cart.
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };
  
  const cartItemCount = cart.length;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-b-3xl">
        <h1 className="text-xl font-bold text-gray-800">Fresh Groceries</h1>
        <div className="relative cursor-pointer" onClick={() => setShowCart(true)}>
          <svg className="w-8 h-8 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h265.4c17 0 31.9 9.9 39.5 24.5l140.7 279.7c3.9 7.7 2.1 17.5-4.6 24.2s-16.5 6.4-24.2-1.2L428.6 150.8l-91.5 183.1C325 342.1 314.7 348.8 303.8 350.5L174.6 370.4c-2.4 .4-4.8 .6-7.2 .6c-2.6 0-5.1-.2-7.5-.8L29.3 438.3C10.6 443.6 0 460.6 0 480c0 17.7 14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-1.4 0-2.8-.2-4.2-.6c-1.4-.4-2.7-1.1-3.9-2.1c-.8-.7-1.5-1.5-2-2.4c-1.2-1.8-1.9-4-1.9-6.3V24zm464 240a64 64 0 1 0 0 128 64 64 0 1 0 0-128zm-256 0a64 64 0 1 0 0 128 64 64 0 1 0 0-128z" fill="currentColor"/>
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      </header>
      
      {/* Rendering the main application sections */}
      <HeroSection heroImageUrl={heroImageUrl} />
      
      <ProductList products={products} onAddToCart={handleAddToCart} />

      {showCart && (
        <CartModal cart={cart} onClose={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default App;