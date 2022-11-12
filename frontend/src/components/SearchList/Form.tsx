import { useRef } from "react";
import { useEventListener } from "usehooks-ts";
import debounce from "lodash/debounce";

interface FormProps {
  handleSearch: (...args: any) => any;
}

export default function Form(props: FormProps) {
  const form = useRef<HTMLFormElement>(null);
  const searchField = useRef<HTMLInputElement>(null);

  function handleSearch(event: any) {
    event.preventDefault();

    const data = new FormData(form.current as HTMLFormElement);

    props.handleSearch(Object.fromEntries(data));
  }

  useEventListener("submit", handleSearch, form);
  useEventListener("keydown", debounce(handleSearch, 300), searchField);

  return (
    <form ref={form} className="relative" action="/kit/products" method="GET">
      <label className="sr-only">Name cont</label>
      <input
        ref={searchField}
        placeholder="Search..."
        className="form-input w-full pl-9 focus:border-slate-300"
        type="search"
        name="q[name_cont]"
      />
      <button
        name="button"
        type="submit"
        className="absolute inset-0 right-auto group"
      >
        <svg
          className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path>
          <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"></path>
        </svg>
      </button>
    </form>
  );
}
