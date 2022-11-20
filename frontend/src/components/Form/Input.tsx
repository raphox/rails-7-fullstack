import clsx from "clsx";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export default function Input({ name, register, error, ...rest }: InputProps) {
  let errors = [];

  if (Array.isArray(error)) {
    errors = error;
  } else if (error) {
    errors.push(error.message as FieldError);
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <div>
        <div
          className={clsx("input string required kit_product_name", {
            field_with_errors: error,
          })}
        >
          <label className="string required block text-sm font-medium mb-1">
            <abbr title="required">*</abbr> Name
          </label>
          <input {...register(name)} {...rest} />
          {errors && (
            <ul className="error">
              {errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
