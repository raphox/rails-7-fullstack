import { Product, useProducts } from "@/pages/kit/products/services";
import { useEffect } from "react";

import {
  useProductsActions,
  useProductsState,
} from "@/src/contexts/products/hooks";
import * as SidebarPrimitive from "@/components/Layout/Sidebar";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Sidebar() {
  const { query, product } = useProductsState();
  const { setQuery, setProduct } = useProductsActions();
  const { products, getAllProducts, isLoading } = useProducts(query);

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
      <div className="relative">
        {isLoading && <LoadingOverlay bgColor="white" />}
        <SidebarPrimitive.List
          items={products || [{ id: undefined, name: "loading..." }]}
          selectedItem={product}
          handleSearch={setQuery}
          handleClickItem={handleClickItem}
        />
      </div>
    </SidebarPrimitive.Root>
  );
}
