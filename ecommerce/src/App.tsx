import { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import CartModal from './components/CartModal';
import ProductList from './components/ProductList';
import type { Product } from './types';

const App = () => {
  const heroImageUrl =
    'https://images.unsplash.com/photo-1586090643003-b2bfb4fbd833?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0';

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Filter & sort states
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('');

  //  State for the new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });

  //  Handler for form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Handler for form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Create a new product object with the price converted to a number
      const productToAdd = {
        ...newProduct,
        price: parseInt(newProduct.price),
      };

      const res = await fetch('http://localhost:5000/groceries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToAdd),
      });

      if (!res.ok) {
        throw new Error('Failed to add new product');
      }

      const addedProduct = await res.json();
      // Update the product list to include the newly added item
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      // Reset the form fields
      setNewProduct({ name: '', category: '', price: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Fetch products from JSON API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/groceries');
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Filtered products
  const filteredProducts = products.filter((product) =>
    categoryFilter === 'all' ? true : product.category === categoryFilter
  );

  // Sorted products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'priceLowHigh') return a.price - b.price;
    if (sortOption === 'priceHighLow') return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-b-3xl">
        <h1 className="text-xl font-bold text-gray-800">Fresh Groceries</h1>
        <div
          className="relative cursor-pointer"
          onClick={() => setShowCart(true)}
        >
          🛒 {cart.length}
        </div>
      </header>

      {/* Hero */}
      <HeroSection heroImageUrl={heroImageUrl} />

      {/* Filters */}
      <div className="flex justify-between items-center p-4">
        <div>
          <label className="mr-2">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Default</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Product Form */}
      <form
        onSubmit={handleFormSubmit}
        className="p-4 bg-white shadow-md rounded-lg mx-4 mt-4"
      >
        <h2 className="text-lg font-bold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleFormChange}
            placeholder="Product Name"
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleFormChange}
            placeholder="Category (e.g., fruits)"
            required
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleFormChange}
            placeholder="Price"
            required
            className="p-2 border rounded"
          />
          <input
            type="url"
            name="image"
            value={newProduct.image}
            onChange={handleFormChange}
            placeholder="Image URL"
            required
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <ProductList products={sortedProducts} onAddToCart={handleAddToCart} />

      {/* Cart Modal */}
      {showCart && <CartModal cart={cart} onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default App;
