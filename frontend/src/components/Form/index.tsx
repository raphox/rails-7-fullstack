import { yupResolver } from "@hookform/resolvers/yup";
import { createElement, ReactElement, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export { default as Input } from "./Input";
import Notification from "@/components/Notification";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  schema?: any;
  defaultValues?: Record<string, any>;
  defaultErrors?: Record<string, any>;
  children: ReactElement | ReactElement[];
  onSubmit: SubmitHandler<any>;
}

export default function Form({
  className,
  schema,
  defaultValues,
  defaultErrors = {},
  children,
  onSubmit,
}: FormProps) {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    Object.entries(defaultErrors).forEach(([key, value]) =>
      setError(key, { type: "custom", message: value })
    );
  }, [defaultErrors]);

  const baseErrors: string[] = defaultErrors?.base || [];

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {baseErrors && (
        <Notification messages={baseErrors.map((err) => err)} type="error" />
      )}

      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    error:
                      errors[child.props.name] ||
                      defaultErrors[child.props.name],
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}
