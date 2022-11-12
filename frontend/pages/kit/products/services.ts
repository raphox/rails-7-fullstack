import useSWR from "swr";
import { fetcher } from "@/src/services";

export { fetcher };

export interface Product {
  id?: number;
  name: string;
}

export function useProducts(params: any, fallbackData: any = null) {
  const { data, error, mutate } = useSWR<Product[]>(
    "kit/products",
    () => fetcher("kit/products", params),
    {
      fallbackData,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useProduct(id?: number, fallbackData: any = null) {
  const { data, error, mutate } = useSWR<Product>(
    id ? `kit/products/${id}` : null,
    fetcher,
    {
      fallbackData,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
