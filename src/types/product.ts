export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductFeatureTiles {
  feel: string;
  coverType: string;
  usp: string;
  coreMaterial: string;
}

export interface ProductCommercial {
  reviews: string;
  recentInterest: string;
  warrantyBadge: string;
  mrp: string;
  sellingPrice: string;
  discountText: string;
}

export interface ProductTestimonial {
  title: string;
  quote: string;
  author: string;
  rating: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  shortDescription?: string;
  description: string;
  images: string[];
  features?: string[];
  specifications?: ProductSpecification[];
  sizes: string[];
  warranty: string;
  material?: string;
  comfort?: string;
  firmness?: string;
  thickness: string;
  tags?: string[];
  faqs?: ProductFaq[];
  featureTiles?: ProductFeatureTiles;
  commercial?: ProductCommercial;
  testimonials?: ProductTestimonial[];
}
