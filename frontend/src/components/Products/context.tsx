import { createContext, Dispatch, useContext, useReducer, useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { Product } from "@/pages/kit/products/services";

interface Action {
  type: ActionKind;
  payload: any;
}

interface State {
  query?: Record<string, any>;
  product: Product;
}

export const initialState: State = {
  query: undefined,
  product: {
    id: undefined,
    name: "",
  } as Product,
};

enum ActionKind {
  SET_QUERY = "SET_QUERY",
  SET_PRODUCT = "SET_PRODUCT",
}

const ProductsStateContext = createContext<State>(initialState);
const ProductsDispatchContext = createContext<Dispatch<Action> | null>(null);

export function useProductsState() {
  return useContext(ProductsStateContext);
}

export function useProductsActions() {
  const actions = (dispatch: Dispatch<Action>) => ({
    setQuery: (query: Record<string, any>) => {
      dispatch({
        type: ActionKind.SET_QUERY,
        payload: query,
      });
    },

    setProduct: (product: Product) => {
      dispatch({
        type: ActionKind.SET_PRODUCT,
        payload: product,
      });
    },
  });

  return actions(useContext(ProductsDispatchContext) as Dispatch<Action>);
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case ActionKind.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    default:
      return state;
  }
}

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
