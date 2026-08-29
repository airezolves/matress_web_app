export interface ProductFeatureTiles {
  feel?: string;
  coverType?: string;
  usp?: string;
  coreMaterial?: string;
  dimensions?: string;
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
  sizes: string[];
  warranty: string;
  material?: string;
  comfort?: string;
  firmness?: string;
  thickness: string;
  tags?: string[];
  featureTiles?: ProductFeatureTiles;
  testimonials?: ProductTestimonial[];
  specificationDetails?: string;
  careInstructions?: string;
  deliveryInformation?: string;
  returnPolicy?: string;
}
