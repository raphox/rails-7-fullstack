import { useRouter } from "next/router";

import {
  fetcher,
  useProduct,
  useProducts,
} from "@/pages/kit/products/services";

import * as SidebarPrimitive from "../Layout/Sidebar";
import { useProductsActions, useProductsState } from "./context";

export default function Sidebar() {
  const router = useRouter();
  const { setQuery, setProductId } = useProductsActions();
  const { query, productId } = useProductsState();
  const { product } = useProduct(productId, {
    revalidateOnMount: router.query.id === undefined,
  });
  const { products, mutate: productsMutate } = useProducts(query);

  const handleSearch = (query: any) => {
    productsMutate(
      async () => await fetcher("kit/products", { params: query }),
      {
        revalidate: false,
      }
    ).then(() => setQuery(query));
  };

  return (
    <SidebarPrimitive.Root>
      <SidebarPrimitive.Header
        href="/kit/products"
        hrefNew="/kit/products"
        title="Products"
      />
      <SidebarPrimitive.List
        items={products}
        selectedItem={product}
        handleSearch={handleSearch}
        handleClickItem={setProductId}
      />
    </SidebarPrimitive.Root>
  );
}
