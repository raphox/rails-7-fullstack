import { createContext, Dispatch, useEffect, useReducer, useRef } from "react";
import { useRouter } from "next/router";

import { Action, actions, initialState, reducer, State } from "./store";

export const ProductsStateContext = createContext<State>(initialState);
export const ProductsDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

interface ProductsProviderProps {
  children: React.ReactNode;
  value: { fallback?: any; fallbackState?: any };
}

export const ProductsProvider = ({
  children,
  value,
}: ProductsProviderProps) => {
  const { fallbackState } = value;
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...fallbackState,
  });
  const { product } = state;
  const prevProduct = useRef(product);

  useEffect(() => {
    const handle = (url: string) => {
      const isRoot = router.pathname === url;

      if (isRoot) {
        prevProduct.current = initialState.product;
        actions(dispatch).setProduct(initialState.product);
      }
    };

    router.events.on("routeChangeComplete", handle);

    return () => router.events.off("routeChangeComplete", handle);
  }, []);

  useEffect(() => {
    if (product.id === prevProduct.current.id) return;

    prevProduct.current = product;

    if (product.id) {
      router.push(router.pathname, `/kit/products/${product.id}`, {
        shallow: true,
      });
    } else {
      router.replace("/kit/products");
    }
  }, [product.id]);

  return (
    <ProductsStateContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsStateContext.Provider>
  );
};
