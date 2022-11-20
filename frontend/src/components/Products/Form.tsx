import * as yup from "yup";
import { useEffect, useState } from "react";
import request from "axios";

import { Product, useProduct } from "@/pages/kit/products/services";
import Notification from "@/components/Notification";
import LoadingOverlay from "@/components/LoadingOverlay";
import FormPrimitive, { Input } from "@/components/Form";
import * as FormActions from "@/components/Form/Actions";
import { initialState, useProductsActions, useProductsState } from "./context";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export default function Form(): JSX.Element {
  const [message, setMessage] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string[]>>({
    base: [],
  });

  const { product: stateProduct } = useProductsState();
  const { setProduct } = useProductsActions();
  const { product, postProduct, putProduct, deleteProduct, isLoading } =
    useProduct(stateProduct);

  useEffect(() => {
    setErrors({});
  }, [product]);

  const onSubmit = async (data: Product) => {
    try {
      setErrors({});
      setMessage(undefined);

      if (product?.id) {
        const newData = await putProduct(data);

        setProduct(newData);
        setMessage("Product was successfully updated");
      } else {
        const newData = await postProduct(data);

        setProduct(newData);
        setMessage("Product was successfully created");
      }
    } catch (error) {
      let errors = {};

      if (request.isAxiosError(error) && error.response?.status === 422) {
        errors = error.response?.data;
      } else {
        errors = {
          base: [(error as Error).message],
        };
      }

      setErrors(errors);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      deleteProduct().then(() => {
        setProduct({ id: undefined } as Product);
        setMessage("Product was successfully removed");
      });
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  return (
    <div className="mb-4 last:mb-0 relative">
      <h2 className="text-2xl text-slate-800 font-bold mb-6">Edit Product</h2>

      {message && <Notification message={message} type="success" />}
      {isLoading && <LoadingOverlay />}

      <FormPrimitive
        className="simple_form grow space-y-6"
        onSubmit={onSubmit}
        schema={schema}
        defaultValues={product || initialState.product}
        defaultErrors={errors}
      >
        <Input name="name" className="string form-input w-full" type="text" />
        <FormActions.Root resource={product} loading={isLoading}>
          <FormActions.Extra
            className="btn shadow-none text-rose-500 mr-3"
            href={`/kit/product/${product?.id}`}
            onClick={handleDelete}
          >
            Destroy this item
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
