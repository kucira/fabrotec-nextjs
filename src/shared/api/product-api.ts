
import { ICategoriesResponse } from "../interfaces/ICategories";
import { IProduct, IProductResponse, ParamsProducts } from "../interfaces/IProduct";
import { paramsToString } from "../libs";
import { API_BASE_URL } from "./api";

export const getProductById = async (id: string): Promise<IProduct | null> => {
  const res = await fetch(`${API_BASE_URL}/product/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
};

export const getProducts = async (params?: ParamsProducts): Promise<IProductResponse | null> => {
  const newParams = {...params, skip: params?.skip || 0, limit: params?.limit || 10};
  const paramsString: string = paramsToString(newParams);
  const res = await fetch(`${API_BASE_URL}/products${paramsString}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
};

export const searchProducts = async (params: any): Promise<IProductResponse | null> => {
  const res = await fetch(`${API_BASE_URL}/products/search/${paramsToString(params)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

export const getCategories = async (): Promise<ICategoriesResponse | null> => {
  const res = await fetch(`${API_BASE_URL}/products/categories`);
  if (!res.ok) return null;
  const data = await res.json();
  return {
    categories: data
  };
}

export const  getCategoryProducts = async (params: any): Promise<IProductResponse | null> => {
  const res = await fetch(`${API_BASE_URL}/products/category/${params.category}${paramsToString(params)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}


