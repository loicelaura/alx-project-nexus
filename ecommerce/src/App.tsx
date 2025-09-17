// Define the shape of our product data using a TypeScript interface
interface Product {
  name: string;
  price: number;
  image: string;
}

const products = [
   { name: 'Fresh Apples', price: 1.25, image: 'https://images.unsplash.com/photo-1683688684067-b87a189c7503?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEZyZXNoJTIwQXBwbGVzfGVufDB8fDB8fHww' },
  { name: 'Organic Bananas', price: 0.99, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop' },
  { name: 'Sweet Tomatoes', price: 2.50, image: 'https://images.unsplash.com/photo-1570543375343-63fe3d67761b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3dlZXQlMjBUb21hdG9lc3xlbnwwfHwwfHx8MA%3D%3D'},
  { name: 'Red Cherries', price: 4.00, image: 'https://images.unsplash.com/photo-1687029968603-904d3833b50f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFJlZCUyMENoZXJyaWVzfGVufDB8fDB8fHww' },
  { name: 'Avocados', price: 2.75, image: 'https://images.unsplash.com/photo-1590005024862-6b67679a29fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEF2b2NhZG9zfGVufDB8fDB8fHww' },
  { name: 'Potatoes', price: 1.50, image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFBvdGF0b2VzfGVufDB8fDB8fHww'},
];

const ProductCard = ({ product }: { product: Product }) => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover"
      loading="lazy"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        <button className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition duration-300">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h265.4c17 0 31.9 9.9 39.5 24.5l140.7 279.7c3.9 7.7 2.1 17.5-4.6 24.2s-16.5 6.4-24.2-1.2L428.6 150.8l-91.5 183.1C325 342.1 314.7 348.8 303.8 350.5L174.6 370.4c-2.4 .4-4.8 .6-7.2 .6c-2.6 0-5.1-.2-7.5-.8L29.3 438.3C10.6 443.6 0 460.6 0 480c0 17.7 14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-1.4 0-2.8-.2-4.2-.6c-1.4-.4-2.7-1.1-3.9-2.1c-.8-.7-1.5-1.5-2-2.4c-1.2-1.8-1.9-4-1.9-6.3V24zm464 240a64 64 0 1 0 0 128 64 64 0 1 0 0-128zm-256 0a64 64 0 1 0 0 128 64 64 0 1 0 0-128z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);
const App = () => {
  const heroImageUrl =
    'https://images.unsplash.com/photo-1586090643003-b2bfb4fbd833?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0';
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white shadow-lg rounded-b-3xl md:rounded-b-[4rem]">
        {/* Left Column for Image */}
        <div className="md:w-1/2 p-4">
          <img
            src={heroImageUrl}
            alt="Fresh Groceries"
            className="rounded-3xl shadow-lg w-full max-h-96 object-cover"
          />
        </div>
        {/* Right Column for Text and Button */}
        <div className="md:w-1/2 p-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Buy Fresh Groceries with Ease
          </h1>
          <p className="mt-4 text-gray-600 max-w-sm mx-auto md:mx-0">
            Shop your favorite produce, dairy, and more from the comfort of your
            home.
          </p>
          <button className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
            Start Shopping
          </button>
        </div>
      </div>
      {/* Search Bar and Filters */}
      <div className="container mx-auto px-4 mt-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Groceries"
            className="w-full pl-10 pr-4 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
          <button className="bg-green-500 text-white text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap shadow-md transition duration-200 hover:bg-green-600">
            All
          </button>
          <button className="bg-white text-gray-700 text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap shadow-md transition duration-200 hover:bg-gray-200">
            Vegetables
          </button>
          <button className="bg-white text-gray-700 text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap shadow-md transition duration-200 hover:bg-gray-200">
            Fruits
          </button>
          <button className="bg-white text-gray-700 text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap shadow-md transition duration-200 hover:bg-gray-200">
            Meat
          </button>
          <button className="bg-white text-gray-700 text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap shadow-md transition duration-200 hover:bg-gray-200">
            Dairy
          </button>
        </div>
      </div>

      {/* Placeholder for Product Grid */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Featured Products
        </h2>
        {/* Product grid  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
