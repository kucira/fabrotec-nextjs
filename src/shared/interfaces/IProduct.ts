export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
}

export interface IProductResponse {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
}

export interface IReview {
  id: string;
  rating: number;
  comment: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ParamsProducts {
  search: string | null;
  category: string | null;
  sortBy: string | null;
  sortOrder: string | null;
  skip: number;
  limit: number;
}
