import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import Layout from "@/components/Layout";

import "../styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [cache] = useState(() => new Map(Object.entries(pageProps.fallback)));

  return (
    <Layout>
      <SWRConfig
        value={{
          fallback: pageProps.fallback,
          provider: () => cache,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}
