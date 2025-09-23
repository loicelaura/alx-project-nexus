import { useEffect, useState, useCallback, useRef } from 'react';
import HeroSection from './components/HeroSection';
import CartModal from './components/CartModal';
import ProductList from './components/ProductList';
import FeaturedProducts from './components/FeaturedProducts';
import ConfirmationPage from './components/ConfirmationPage';
import type { Product } from './types';

const App = () => {
  const heroImageUrl =
    'https://images.unsplash.com/photo-1586090643003-b2bfb4fbd833?q=80&w=1200&auto=format&fit=crop';

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('');

  const productsPerPage = 17;
  const observer = useRef<IntersectionObserver | null>(null);
  const productListRef = useRef<HTMLDivElement>(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderToConfirm, setOrderToConfirm] = useState<Product[]>([]);

  const handleScrollToProducts = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        price: parseInt(newProduct.price),
      };

      const res = await fetch('http://localhost:5000/groceries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToAdd),
      });

      if (!res.ok) throw new Error('Failed to add new product');

      const addedProduct = await res.json();
      setProducts((prev) => [...prev, addedProduct]);
      setNewProduct({ name: '', category: '', price: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleGoBackToShopping = () => {
    setShowConfirmation(false);
  };

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
        const res = await fetch(`/groceries.json`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        
        // Correctly access the 'groceries' array from the fetched data
        const allProducts = data.groceries; 

        const filteredAndSortedProducts = allProducts
            .filter((p: Product) => {
                const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
                const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
            })
            .sort((a: Product, b: Product) => {
                if (sortOption === 'priceLowHigh') {
                    return a.price - b.price;
                } else if (sortOption === 'priceHighLow') {
                    return b.price - a.price;
                }
                return 0;
            });
        
        setProducts(filteredAndSortedProducts);
        setHasMore(filteredAndSortedProducts.length > 0);
        
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        setLoading(false);
    }
}, [loading, hasMore, page, productsPerPage, searchTerm, categoryFilter, sortOption]);

  const handleCheckout = () => {
    const order = [...cart];
    setOrderToConfirm(order);
    setCart([]);
    setShowCart(false);
    setShowConfirmation(true);
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts();
  }, [categoryFilter, sortOption, searchTerm]);

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchProducts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchProducts]
  );

  const slicedProducts = products.slice(0, page * productsPerPage);
  const featuredProducts = slicedProducts.filter((p) => p.isFeatured);
  const nonFeaturedProducts = slicedProducts.filter((p) => !p.isFeatured);

  return (
    <div className="bg-gray-100 min-h-screen font-sans max-w-7xl mx-auto p-4">
      {showConfirmation ? (
        <ConfirmationPage
          order={orderToConfirm}
          total={orderToConfirm.reduce((sum, item) => sum + item.price, 0)}
          onGoBackToShopping={handleGoBackToShopping}
        />
      ) : (
        <>
          <header className="bg-white shadow-md p-4 flex justify-between items-center rounded-b-3xl mb-6">
            <h1 className="text-xl font-bold text-gray-800">Fresh Groceries</h1>
            <div
              className="relative p-2 bg-gray-200 rounded-full cursor-pointer transition-colors duration-300 hover:bg-gray-300"
              onClick={() => setShowCart(true)}
            >
              🛒{' '}
              <span className="text-gray-800 font-semibold">{cart.length}</span>
            </div>
          </header>

          <HeroSection
            heroImageUrl={heroImageUrl}
            onScrollToProducts={handleScrollToProducts}
          />

          <FeaturedProducts products={featuredProducts} onAddToCart={handleAddToCart} />

          <div className="flex justify-between items-center p-4 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-lg w-full max-w-sm outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="dairy">Dairy</option>
              <option value="drinks">Drinks</option>
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Default</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
            </select>
          </div>

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
                className="p-2 border rounded focus:ring-green-500"
              />
              <input
                type="url"
                name="image"
                value={newProduct.image}
                onChange={handleFormChange}
                placeholder="Image URL"
                required
                className="p-2 border rounded focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Product
            </button>
          </form>

          <ProductList
            products={nonFeaturedProducts}
            onAddToCart={handleAddToCart}
            lastProductElementRef={lastProductElementRef}
            listRef={productListRef}
          />

          {loading && <p className="text-center mt-4">Loading...</p>}
          {!hasMore && (
            <p className="text-center mt-4">No more products to load.</p>
          )}

          {showCart && (
            <CartModal
              cart={cart}
              onClose={() => setShowCart(false)}
              onCheckout={handleCheckout}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;