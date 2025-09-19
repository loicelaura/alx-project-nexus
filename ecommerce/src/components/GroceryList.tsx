import { useEffect, useState } from "react";
import ProductList from "./ProductList";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const GroceryList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [page, setPage] = useState(1);
  const pageSize = 4; // number of products per page

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/groceries");
        const data: Product[] = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    let tempProducts = [...products];
    if (category !== "all") {
      tempProducts = tempProducts.filter((p) => p.category === category);
    }

    // Sort products
    switch (sortOption) {
      case "price-low-high":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(tempProducts.slice(0, page * pageSize));
  }, [category, sortOption, page, products]);

  // Load more products (for infinite scroll)
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="my-8 px-4">
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="drinks">Drinks</option>
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border rounded">
          <option value="default">Default</option>
          <option value="price-low-high">Price: Low → High</option>
          <option value="price-high-low">Price: High → Low</option>
          <option value="name-a-z">Name: A → Z</option>
          <option value="name-z-a">Name: Z → A</option>
        </select>
      </div>

      {/* Product List */}
      <ProductList products={filteredProducts} onAddToCart={() => {}} />

      {/* Load More Button */}
      {filteredProducts.length < products.length && (
        <div className="text-center mt-4">
          <button onClick={loadMore} className="px-4 py-2 bg-green-500 text-white rounded">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
