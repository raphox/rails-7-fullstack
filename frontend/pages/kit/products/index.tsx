import { dehydrate, QueryClient } from "@tanstack/react-query";

import { findAll } from "./services";

import Form from "@/src/components/Products/Form";
import Sidebar from "@/components/Products/Sidebar";
import * as Page from "@/components/Layout/Page";
import { ProductsProvider } from "@/src/components/Products/context";

interface ProductsPageProps {
  fallback: Record<string, any>;
}

export default function ProductsPage({ fallback }: ProductsPageProps) {
  return (
    <ProductsProvider value={{ fallback }}>
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

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["kit/products"], findAll);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
