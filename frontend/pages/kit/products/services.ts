import { fetcher } from "@/src/services";
import { useQuery } from "@tanstack/react-query";

export { fetcher };

export interface Product {
  id?: number;
  name: string;
}

export function useProducts(query?: Record<string, undefined>) {
  return useQuery({
    queryKey: ["kit/products"],
    queryFn: () => fetcher("kit/products", { params: query }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useProduct(id?: number) {
  return useQuery({
    queryKey: ["kit/products", id],
    queryFn: () => fetcher(`kit/products/${id}`),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}
