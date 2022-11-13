import {
  fetcher,
  useProduct,
  useProducts,
} from "@/pages/kit/products/services";
import { useEffect } from "react";
import { useRouter } from "next/router";

import * as SidebarPrimitive from "../Layout/Sidebar";
import { useProductsActions, useProductsState } from "./context";

export default function Sidebar() {
  const { setQuery, setProductId } = useProductsActions();
  const { query, productId } = useProductsState();
  const { products, mutate: productsMutate } = useProducts(query);
  const { product } = useProduct(productId || -1);
  const router = useRouter();

  useEffect(() => {
    if (product === undefined) return;

    router.push(router.pathname, `/kit/products/${product.id}`, {
      shallow: true,
    });
  }, [product]);

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
