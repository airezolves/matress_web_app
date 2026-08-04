import { Product } from "@/types/product";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartProductItem extends CartItem {
  product: Product;
}

export interface InquiryCartContextValue {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
}
