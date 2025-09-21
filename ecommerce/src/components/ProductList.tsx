
import React from 'react';
import type { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  lastProductElementRef: (node: HTMLDivElement | null) => void;
  listRef: React.RefObject<HTMLDivElement>;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  lastProductElementRef,
  listRef,
}) => {
  return (
    <div ref={listRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => {
        const isLast = index === products.length - 1;
        return (
          <div
            key={product.id}
            ref={isLast ? lastProductElementRef : null}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <button
                onClick={() => onAddToCart(product)}
                className="mt-2 w-full bg-green-500 text-white rounded p-2 hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
