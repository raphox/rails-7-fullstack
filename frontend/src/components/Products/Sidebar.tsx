import { useRouter } from "next/router";
import { useEffect } from "react";

import { useProduct, useProducts } from "@/pages/kit/products/services";

import * as SidebarPrimitive from "../Layout/Sidebar";
import { useProductsActions, useProductsState } from "./context";

export default function Sidebar() {
  const router = useRouter();
  const { setQuery, setProductId } = useProductsActions();
  const { query, productId } = useProductsState();
  const { data: products, refetch } = useProducts(query);
  const { data: product } = useProduct(productId);

  useEffect(() => {
    if (query !== undefined) refetch();
  }, [query]);

  return (
    <SidebarPrimitive.Root>
      <SidebarPrimitive.Header
        href="/kit/products"
        hrefNew="/kit/products"
        title="Products"
      />
      <SidebarPrimitive.List
        items={products || []}
        selectedItem={product}
        handleSearch={setQuery}
        handleClickItem={setProductId}
      />
    </SidebarPrimitive.Root>
  );
}
