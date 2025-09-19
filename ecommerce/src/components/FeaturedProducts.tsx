import React from 'react';
import type { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
}) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg mx-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Featured Products</h2>
      <div className="flex overflow-x-auto gap-4 p-2 scrollbar-hide">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-48 bg-gray-100 rounded-lg shadow-sm p-4 text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-24 w-24 object-cover rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold truncate">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="mt-2 w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;