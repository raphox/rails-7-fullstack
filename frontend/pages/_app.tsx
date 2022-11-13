import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import Layout from "@/components/Layout";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SWRConfig value={{ fallback: pageProps.fallback }}>
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}
