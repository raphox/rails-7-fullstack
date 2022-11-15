import { GetStaticPropsContext } from "next/types";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { fetcher } from "./services";

import Form from "@/src/components/Products/Form";
import Sidebar from "@/components/Products/Sidebar";
import * as Page from "@/components/Layout/Page";
import { ProductsProvider } from "@/src/components/Products/context";

interface ProductsPageProps {
  id: number;
  fallback: Record<string, any>;
}

export default function ProductPage({ id, fallback }: ProductsPageProps) {
  return (
    <ProductsProvider value={{ fallback, fallbackState: { productId: id } }}>
      <Page.Root>
        <Page.Sidebar>
          <Sidebar />
        </Page.Sidebar>
        <Page.Content>
          <Form />
        </Page.Content>
      </Page.Root>
    </ProductsProvider>
  );
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  const productId = context.params?.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["kit/products"],
    async () => await fetcher("kit/products")
  );

  if (productId) {
    await queryClient.prefetchQuery(
      ["kit/products", productId],
      async () => await fetcher(`kit/products/${productId}`)
    );
  }

  return {
    props: {
      id: productId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
