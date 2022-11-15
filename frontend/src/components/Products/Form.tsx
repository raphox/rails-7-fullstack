import * as yup from "yup";
import { useEffect, useState } from "react";
import { api } from "@/src/services";
import request from "axios";

import { Product, useProduct } from "@/pages/kit/products/services";
import FormPrimitive, { Input } from "@/components/Form";
import Notification from "@/components/Notification";
import * as FormActions from "@/components/Form/Actions";
import { useProductsActions, useProductsState } from "./context";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export default function Form(): JSX.Element {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string>();
  const [errors, setErrors] = useState({});
  const { productId } = useProductsState();
  const { setProductId } = useProductsActions();
  const { data: product } = useProduct(productId);

  useEffect(() => {
    setErrors({});
  }, [productId]);

  const updateMutation = useMutation({
    mutationFn: async (data: Product) => {
      try {
        const { data: updatedProduct } = await api.request({
          url: `kit/products/${data.id || ""}`,
          method: data.id ? "put" : "post",
          data: {
            kit_product: data,
          },
        });

        setMessage(
          `Product was successfully ${data.id ? "updated" : "created"}`
        );

        return updatedProduct;
      } catch (err) {
        if (request.isAxiosError(err) && err.response) {
          setErrors(err.response?.data);
        }

        throw err;
      }
    },
    onSuccess: async (updatedProduct) => {
      await queryClient.setQueryData<Product[]>(["kit/products"], (old) => {
        const oldProducts = old ? [...old] : [];

        const index = oldProducts.findIndex(
          (item) => item.id === updatedProduct.id
        ) as number;

        if (index > -1) {
          oldProducts[index] = updatedProduct;
        } else {
          oldProducts.push(updatedProduct);
        }

        return oldProducts;
      });

      setProductId(updatedProduct.id);
    },
  });

  const destroyMutation = useMutation({
    mutationFn: async (data: Product) => {
      await api.delete(`kit/products/${data.id}`);

      setMessage("Product was successfully destroyed.");

      return data;
    },
    onSuccess: async (updatedProduct) => {
      await queryClient.setQueryData<Product[]>(["kit/products"], (old) => {
        const oldProducts = old || [];
        return oldProducts.filter((item) => item.id !== updatedProduct.id);
      });

      setProductId(undefined);
    },
  });

  const onSubmit = (data: Product) => {
    updateMutation.mutate(data);
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    destroyMutation.mutate(product);
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
