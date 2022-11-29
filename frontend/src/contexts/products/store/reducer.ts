import { Product } from "@/pages/kit/products/services";

export enum ActionKind {
  SET_QUERY = "SET_QUERY",
  SET_PRODUCT = "SET_PRODUCT",
}

export interface Action {
  type: ActionKind;
  payload: any;
}

export interface State {
  query?: Record<string, unknown>;
  product: Product;
}

export const initialState: State = {
  query: undefined,
  product: {
    id: undefined,
    name: "",
  } as Product,
};

export function reducer(state: State, action: Action): State {
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
