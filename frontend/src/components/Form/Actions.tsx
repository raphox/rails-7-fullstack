import Link, { LinkProps } from "next/link";
import clsx from "clsx";

interface FormActionsProps {
  resource: any;
  children: React.ReactNode;
}

function FormActions({ resource, children }: FormActionsProps) {
  return (
    <footer>
      <div className="flex flex-col py-5 border-t border-slate-200">
        <div className="flex self-end">
          {resource && resource.id && children}
          <input
            type="submit"
            name="commit"
            value={resource && resource.id ? "Update" : "Create"}
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
          />
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
