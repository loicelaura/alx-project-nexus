

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isFeatured?: boolean;
}

export interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  lastProductElementRef: (node: HTMLDivElement) => void;
}