import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "@/src/services";

export { fetcher };

export interface Product {
  id?: number;
  name: string;
}

export function useProducts(params: any, config?: SWRConfiguration) {
  const { data, error, mutate } = useSWR<Product[]>(
    "kit/products",
    () => fetcher("kit/products", { params }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      ...config,
    }
  );

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useProduct(id: number | undefined, config?: SWRConfiguration) {
  const { data, error, mutate } = useSWR(
    id ? `kit/products/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      ...config,
    }
  );

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
