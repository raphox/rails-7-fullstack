import { useEffect, useState } from "react";

import { fetcher, Product, useProducts } from "@/pages/kit/products/services";
import * as SidebarPrimitive from "../Layout/Sidebar";
import { useSWRConfig } from "swr";

interface SidebarProps {
  loadProduct: Function;
  selectProduct: Product | undefined;
}

export default function Sidebar({ loadProduct, selectProduct }: SidebarProps) {
  const [query, setQuery] = useState<Record<string, any>>();
  const { fallback } = useSWRConfig();
  const { products, mutate } = useProducts(query, fallback["kit/products"]);

  const handleSearch = (query: any) => {
    setQuery(query);
  };

  useEffect(() => {
    if (!query) return;

    mutate(
      async () => {
        return await fetcher("kit/products", { params: query });
      },
      { revalidate: false }
    );
  }, [query]);

  return (
    <SidebarPrimitive.Root>
      <SidebarPrimitive.Header
        href="/kit/products"
        hrefNew="/kit/products"
        title="Products"
      />
      <SidebarPrimitive.List
        items={products}
        selectItem={selectProduct}
        handleSearch={handleSearch}
        handleClickItem={loadProduct}
      />
    </SidebarPrimitive.Root>
  );
}
