import React, { useState, useEffect, useMemo} from 'react';
import { fetchProducts } from './api';
import type { Product } from './api';

const App: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('default');

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const data = await fetchProducts();
        setAllProducts(data);
        setError(null); // Clear any previous errors on success
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete (success or failure)
      }
    };

    getProducts();
  }, []); // The empty dependency array ensures this runs only once on component mount

  // Get unique categories from the products data
  const categories = useMemo(() => {
    const uniqueCategories = new Set (allProducts.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [allProducts]);

  // This `useMemo` hook handles both filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    let sorted = [...filtered];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption  === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [allProducts, selectedCategory, sortOption]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="contsiner mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Product Catalog</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          {categories.map(category => (
            <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out${selectedCategory === category
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
            `}
            >
              {category}
            </button>
         ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort"  className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 p-2"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
             src={product.image}
             alt={product.name}
             className="w-full h-40 sm:h-48 object-cover rounded-t-xl"
             />
             <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 truncate">{product.name}</h2>
              <p className="text-green-600 font-extrabold text-xl mt-1">${product.price.toFixed(2)}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
