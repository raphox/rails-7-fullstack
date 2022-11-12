import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { fetcher, useProduct, Product } from "./services";

import Form from "@/src/components/Products/Form";
import Sidebar from "@/components/Products/Sidebar";
import * as Page from "@/components/Layout/Page";
import { ProductsProvider } from "@/src/components/Products/context";

interface ProductsPageProps {
  id: number;
  fallback: Record<string, any>;
}

export default function ProductsPage({ fallback }: ProductsPageProps) {
  const [selectId, setSelectId] = useState();
  const { product } = useProduct(selectId);
  // const router = useRouter();

  // useEffect(
  //   () => (!router.query.id ? setSelectId(undefined) : undefined),
  //   [router.query.id]
  // );

  // useEffect(() => {
  //   if (!selectId || selectId === router.query.id) return;

  //   router.push(`?id=${selectId}`, `/kit/products/${selectId}`, {
  //     shallow: true,
  //   });
  // }, [selectId]);

  return (
    <ProductsProvider value={{ fallback }}>
      <Page.Root>
        <Page.Sidebar>
          <Sidebar loadProduct={setSelectId} selectProduct={product} />
        </Page.Sidebar>
        <Page.Content>
          <Form product={product || ({ name: "" } as Product)} />
        </Page.Content>
      </Page.Root>
    </ProductsProvider>
  );
}

export async function getServerSideProps() {
  const products = await fetcher("kit/products");

  return {
    props: {
      fallback: {
        "kit/products": products,
      },
    },
  };
}
