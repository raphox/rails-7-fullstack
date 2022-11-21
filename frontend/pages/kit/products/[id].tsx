import { GetServerSideProps } from "next/types";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { findAll, findById, Product } from "./services";

import Form from "@/src/components/Products/Form";
import Sidebar from "@/components/Products/Sidebar";
import * as Page from "@/components/Layout/Page";
import { ProductsProvider } from "@/contexts/products";

interface ProductsPageProps {
  product: Product;
  fallback: Record<string, any>;
}

export default function ProductPage({ product, fallback }: ProductsPageProps) {
  return (
    <ProductsProvider value={{ fallback, fallbackState: { product } }}>
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productId = params?.id ? parseInt(params.id as string) : undefined;
  const queryClient = new QueryClient();
  let product = {} as Product;

  await queryClient.prefetchQuery(["kit/products"], findAll);

  if (productId) {
    product = await findById(productId);

    await queryClient.prefetchQuery(["kit/products", productId], () => product);
  }

  return {
    props: {
      product: product,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
