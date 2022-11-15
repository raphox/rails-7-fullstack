import * as yup from "yup";
import { useState } from "react";
import { api } from "@/src/services";
import { useSWRConfig } from "swr";
import request from "axios";

import { Product, useProduct } from "@/pages/kit/products/services";
import FormPrimitive, { Input } from "@/components/Form";
import Notification from "@/components/Notification";
import * as FormActions from "@/components/Form/Actions";
import { useProductsActions, useProductsState } from "./context";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export default function Form(): JSX.Element {
  const { mutate } = useSWRConfig();
  const [message, setMessage] = useState<string>();
  const [errors, setErrors] = useState({});
  const { productId } = useProductsState();
  const { setProductId } = useProductsActions();
  const { product } = useProduct(productId);

  const onSubmit = (data: Product) => {
    mutate(
      "kit/products",
      async (products: Product[]) => {
        try {
          const currentProducts = products !== undefined ? products : [];

          const { data: updatedProduct } = await api.request({
            url: `kit/products/${data.id || ""}`,
            method: data.id ? "put" : "post",
            data: {
              kit_product: data,
            },
          });

          if (!data.id) {
            setProductId(updatedProduct.id);
          }

          if (currentProducts.length <= 0 || !data.id) {
            setMessage("Product was successfully created.");

            return [updatedProduct, ...currentProducts];
          }

          setMessage("Product was successfully updated.");

          return currentProducts.map((item) =>
            item.id === data.id ? updatedProduct : item
          );
        } catch (err) {
          if (request.isAxiosError(err) && err.response) {
            setErrors(err.response?.data);
          }

          products;
        }
      },
      { revalidate: false }
    );
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    mutate(
      "kit/products",
      async (products: Product[]) => {
        if (product === undefined) return;

        await api.delete(`kit/products/${product.id}`);

        setMessage("Product was successfully destroyed.");
        setProductId(undefined);

        return products.filter((item) => item.id !== product.id);
      },
      { revalidate: false }
    );
  };

  return (
    <div className="mb-4 last:mb-0">
      <h2 className="text-2xl text-slate-800 font-bold mb-6">Edit Product</h2>
      <Notification message={message} />
      <FormPrimitive
        className="simple_form grow space-y-6"
        onSubmit={onSubmit}
        schema={schema}
        defaultValues={product || { name: "" }}
        defaultErrors={errors}
      >
        <Input name="name" className="string form-input w-full" type="text" />
        <FormActions.Root resource={product}>
          <FormActions.Extra
            className="btn shadow-none text-rose-500 mr-3"
            href={`/kit/product/${product?.id}`}
            onClick={handleDelete}
          >
            Destroy this product
          </FormActions.Extra>
          <FormActions.Extra
            className="btn border-slate-200 hover:border-slate-300 text-slate-600"
            href="/kit/products"
          >
            Back
          </FormActions.Extra>
        </FormActions.Root>
      </FormPrimitive>
    </div>
  );
}
