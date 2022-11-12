import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next/types";

import { fetcher, useProduct, Product } from "./services";

import Form from "@/src/components/Products/Form";
import Sidebar from "@/components/Products/Sidebar";
import * as Page from "@/components/Layout/Page";
import { ProductsProvider } from "@/src/components/Products/context";

interface ProductsPageProps {
  id: number;
  fallback: Record<string, any>;
}

export default function ProductPage({ id, fallback }: ProductsPageProps) {
  const [selectId, setSelectId] = useState(id);
  const { product } = useProduct(selectId, fallback[`kit/products/${id}`]);
  const router = useRouter();

  useEffect(() => {
    if (!selectId || selectId === id) return;

    router.push(`/kit/products/[id]`, `/kit/products/${selectId}`, {
      shallow: true,
    });
  }, [selectId]);

  return (
    <ProductsProvider value={{ fallback }}>
      <Page.Root>
        <Page.Sidebar>
          <Sidebar loadProduct={setSelectId} selectProduct={product} />
        </Page.Sidebar>
        <Page.Content>
          <Form product={product || ({} as Product)} />
        </Page.Content>
      </Page.Root>
    </ProductsProvider>
  );
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  if (context.params?.id === "new") {
    return {
      redirect: {
        permanent: true,
        destination: "/kit/products",
      },
      props: {},
    };
  }

  let fallback: Record<string, any> = {
    "kit/products": await fetcher("kit/products"),
  };

  if (context.params?.id) {
    fallback["kit/products#selected"] = await fetcher(
      `kit/products/${context.params?.id}`
    );

    fallback[`kit/products/${context.params?.id}`] =
      fallback["kit/products#selected"];
  }

  return {
    props: {
      id: context.params?.id || "",
      fallback,
    },
  };
}
