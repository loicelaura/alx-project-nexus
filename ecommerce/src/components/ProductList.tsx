
import React from "react";
import  type { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded shadow p-4 flex flex-col items-center"
        >
          <img src={product.image} alt={product.name} className="h-24 w-24 object-cover mb-2" />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
          <button
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;