
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

// Simulates fetching product data from a backend API.
// It returns a Promise that resolves with an array of products after a delay.
export const fetchProducts = (): Promise<Product[]> => {
  return new Promise ((resolve) => {
    // Simulate a network delay
    setTimeout(() => {
      // In a real application, this would be a fetch() call to a real API endpoint.
      const mockProducts: Product[] = [
        { id: 1, name: 'Fresh Apples', price: 1.25, category: 'Fruits', image: 'https://placehold.co/200x200/bbf7d0/16a34a?text=Apples' },
        { id: 2, name: 'Organic Bananas', price: 0.99, category: 'Fruits', image: 'https://placehold.co/200x200/bbf7d0/16a34a?text=Bananas' },
        { id: 3, name: 'Crunchy Lettuce', price: 2.15, category: 'Vegetables', image: 'https://placehold.co/200x200/bbf7d0/16a34a?text=Lettuce' },
        { id: 4, name: 'Sweet Tomatoes', price: 2.50, category: 'Vegetables', image: 'https://placehold.co/200x200/bbf7d0/16a34a?text=Tomatoes' },
        { id: 5, name: 'Farm Eggs', price: 3.99, category: 'Dairy', image: 'https://placehold.co/200x200/bbf7d0/16a34a?text=Eggs' },
        { id: 6, name: 'Whole Milk', price: 4.25, category: 'Dairy', image: 'https://placehold.co/200x200/bbf7d0/16a34a?text=Milk' },
        { id: 7, name: 'Sirloin Steak', price: 15.75, category: 'Meat', image: 'https://placehold.co/200x200/bbf7d0/16a34a?text=Steak' },
        { id: 8, name: 'Chicken Breast', price: 9.99, category: 'Meat', 'image': 'https://placehold.co/200x200/bbf7d0/16a34a?text=Chicken' },
      ];
      resolve(mockProducts);
    }, 1000); // 1-second delay to simulate network latency
  });
};