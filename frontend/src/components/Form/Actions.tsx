import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import Loading from "../Loading";

interface FormActionsProps {
  resource: any;
  children: React.ReactNode;
  loading: boolean;
}

function FormActions({
  resource,
  children,
  loading = false,
}: FormActionsProps) {
  return (
    <footer>
      <div className="flex flex-col py-5 border-t border-slate-200">
        <div className="flex self-end">
          {resource && resource.id && children}
          <button
            type="submit"
            name="commit"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
            disabled={loading}
          >
            {loading && <Loading color="slate-100" />}
            {resource && resource.id ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </footer>
  );
}

function FormActionsExtra({
  className,
  ...rest
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <Link className={clsx(`btn shadow-none mr-3`, className)} {...rest} />;
}

export { FormActions as Root, FormActionsExtra as Extra };
