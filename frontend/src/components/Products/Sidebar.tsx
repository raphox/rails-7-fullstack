import { Product, useProducts } from "@/pages/kit/products/services";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as SidebarPrimitive from "../Layout/Sidebar";
import { useProductsActions, useProductsState } from "./context";

export default function Sidebar() {
  const { query, product } = useProductsState();
  const { setQuery, setProduct } = useProductsActions();
  const { products, getAllProducts } = useProducts(query);
  const router = useRouter();

  useEffect(() => {
    if (query === undefined) return;

    getAllProducts();
  }, [query]);

  const handleClickItem = (productId: number) => {
    setProduct({ id: productId } as Product);
  };

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
        handleClickItem={handleClickItem}
      />
    </SidebarPrimitive.Root>
  );
}
