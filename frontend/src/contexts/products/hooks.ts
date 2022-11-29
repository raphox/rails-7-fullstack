import { Dispatch, useContext } from "react";

import { Product } from "@/pages/kit/products/services";
import { Action, ActionKind } from "./store";
import { ProductsDispatchContext, ProductsStateContext } from ".";

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
