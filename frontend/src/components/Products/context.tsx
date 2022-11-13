import { useProduct, useProducts } from "@/pages/kit/products/services";
import { createContext, Dispatch, useContext, useReducer } from "react";

const initialState: State = {
  query: {},
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

    setProductId: (productId: number) => {
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
  query: Record<string, any>;
  productId?: number;
}

export const ProductsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: { fallback?: any; fallbackState?: any };
}) => {
  const { fallback, fallbackState } = value;
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...fallbackState,
  });

  return (
    <ProductsStateContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsStateContext.Provider>
  );
};
