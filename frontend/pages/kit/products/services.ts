import { api } from "@/src/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Product {
  id?: number;
  name: string;
}

export const findAll = async (query?: Record<string, any>) => {
  const response = await api.get<Product[]>("kit/products", { params: query });

  return response.data;
};

export const findById = async (id: any) => {
  const response = await api.get<Product>(`kit/products/${id}`);

  return response.data;
};

const create = async ({ name }: Product) => {
  const response = await api.post<any>("kit/products", {
    kit_product: { name },
  });

  return response.data;
};

const update = async (id: any, { name }: Product) => {
  const response = await api.put<any>(`kit/products/${id}`, {
    kit_product: { name },
  });

  return response.data;
};

const deleteById = async (id: any) => {
  const response = await api.delete<any>(`kit/products/${id}`);

  return response.data;
};

export function useProducts(query?: Record<string, any>) {
  const {
    data,
    isFetching,
    refetch: getAllProducts,
  } = useQuery(["kit/products"], async () => await findAll(query));

  return {
    products: data,
    isLoading: isFetching,
    getAllProducts,
  };
}

export function useProduct(product: Product) {
  const {
    data,
    isFetching: isLoadingProduct,
    refetch: getProduct,
  } = useQuery(
    ["kit/products", product.id],
    async () => await findById(product.id),
    { enabled: !!product.id }
  );
  const queryClient = useQueryClient();

  const { isLoading: isPostingProduct, mutateAsync: postProduct } = useMutation(
    (newData: Product) => create(newData),
    {
      onSuccess: (data) => {
        queryClient.prefetchQuery(["kit/products", data.id], () => data);

        const previousTodos = queryClient.getQueryData<Product[]>([
          "kit/products",
        ])!;

        queryClient.setQueryData(["kit/products"], () => [
          data,
          ...previousTodos,
        ]);
      },
    }
  );

  const { isLoading: isPuttingProduct, mutateAsync: putProduct } = useMutation(
    (newData: Product) => update(product.id, newData),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["kit/products", product.id],
        });

        const previousTodos = queryClient.getQueryData<Product[]>([
          "kit/products",
        ])!;

        queryClient.setQueryData(["kit/products"], () =>
          previousTodos.map((item) => (item.id === data.id ? data : item))
        );
      },
    }
  );

  const { isLoading: isDeletingProduct, mutateAsync: deleteProduct } =
    useMutation(() => deleteById(product.id), {
      onSuccess: () => {
        const previousTodos = queryClient.getQueryData<Product[]>([
          "kit/products",
        ])!;

        queryClient.setQueryData(["kit/products"], () =>
          previousTodos.filter((item) => item.id !== product.id)
        );
      },
    });

  return {
    product: data,
    isLoading:
      !!product.id &&
      (isLoadingProduct ||
        isPostingProduct ||
        isPuttingProduct ||
        isDeletingProduct),
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
  };
}
