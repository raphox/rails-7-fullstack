import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { SWRConfig, useSWRConfig } from "swr";

import { ScopedMutator } from "swr/dist/types";

import {
  fetcher,
  Product,
  useProduct,
  useProducts,
} from "@/pages/kit/products/services";

export function useProductsState() {
  return useContext(ProductsStateContext);
}

export function useProductsActions() {
  const actions = (dispatch: Dispatch<Action>) => ({
    addProduct: (product: Product) => {
      dispatch({
        type: ActionKind.ADD_PRODUCT,
        payload: product,
      });
    },
    filterProducts: (query: Record<string, any> | undefined) => {
      dispatch({
        type: ActionKind.FILTER_PRODUCTS,
        payload: query,
      });
    },
  });

  return actions(useContext(ProductsDispatchContext) as Dispatch<Action>);
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.ADD_PRODUCT:
      const { newProduct } = action.payload;

      return {
        ...state,
        products: state.products.map((item) =>
          item.id === newProduct.id ? newProduct : item
        ),
      };
    case ActionKind.FILTER_PRODUCTS:
      const query = action.payload;

      state.mutate(
        "kit/products",
        async () => {
          return await fetcher("kit/products", { params: query });
        },
        { revalidate: false }
      );

      return state;
    default:
      return state;
  }
}

enum ActionKind {
  ADD_PRODUCT = "ADD_PRODUCT",
  FILTER_PRODUCTS = "FILTER_PRODUCTS",
}

interface Action {
  type: ActionKind;
  payload: any;
}

interface State {
  products: Product[];
  product: Product | undefined;
  mutate: ScopedMutator<any>;
}

const initialState: State = {
  products: [],
  product: {} as Product,
  mutate: undefined as unknown as ScopedMutator<any>,
};

const ProductsStateContext = createContext<State>(initialState);
const ProductsDispatchContext = createContext<Dispatch<Action> | null>(null);

export const ProductsProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: { fallback: any };
}) => {
  const { mutate } = useSWRConfig();
  const { fallback } = value;
  const fallbackProduct: Product = fallback["kit/products#selected"];

  const { product } = useProduct(fallbackProduct?.id, fallbackProduct);
  const { products } = useProducts({}, fallback["kit/products"]);

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    products,
    product,
    mutate,
  });

  return (
    <SWRConfig value={value}>
      <ProductsStateContext.Provider value={state}>
        <ProductsDispatchContext.Provider value={dispatch}>
          {children}
        </ProductsDispatchContext.Provider>
      </ProductsStateContext.Provider>
    </SWRConfig>
  );
};
