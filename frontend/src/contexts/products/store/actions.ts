import { Dispatch } from "react";

import { Product } from "@/pages/kit/products/services";
import { Action, ActionKind } from "./reducer";

export const actions = (dispatch: Dispatch<Action>) => ({
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
