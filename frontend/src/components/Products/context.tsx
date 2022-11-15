import { createContext, Dispatch, useContext, useReducer } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const initialState: State = {
  query: undefined,
  productId: undefined,
};

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

    setProductId: (productId: number | undefined) => {
      dispatch({
        type: ActionKind.SET_PRODUCT_ID,
        payload: productId,
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

    case ActionKind.SET_PRODUCT_ID:
      return {
        ...state,
        productId: action.payload,
      };

    default:
      return state;
  }
}

enum ActionKind {
  SET_QUERY = "SET_QUERY",
  SET_PRODUCT_ID = "SET_PRODUCT_ID",
}

interface Action {
  type: ActionKind;
  payload: any;
}

interface State {
  query?: Record<string, any>;
  productId?: number;
}

export const ProductsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: { fallback?: any; fallbackState?: any };
}) => {
  const router = useRouter();
  const { fallbackState } = value;
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...fallbackState,
  });

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const isRoot = router.pathname === url;

      isRoot &&
        dispatch({
          type: ActionKind.SET_PRODUCT_ID,
          payload: undefined,
        });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (
      state.productId !== undefined &&
      state.productId !== parseInt(router.query.id as string)
    ) {
      router.push(router.pathname, `/kit/products/${state.productId}`, {
        shallow: true,
      });
    } else if (router.asPath !== "/kit/products") {
      router.replace("/kit/products");
    }
  }, [state.productId]);

  return (
    <ProductsStateContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsStateContext.Provider>
  );
};
