import { createContext, Dispatch, useEffect, useReducer, useRef } from "react";
import { useRouter } from "next/router";

import { Action, ActionKind, initialState, reducer, State } from "./store";

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
    const handleRouteChange = (url: string) => {
      const isRoot = router.pathname === url;

      if (isRoot) {
        prevProduct.current = initialState.product;

        dispatch({
          type: ActionKind.SET_PRODUCT,
          payload: initialState.product,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (product.id === prevProduct.current.id) return;

    if (product.id) {
      prevProduct.current = product;

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
