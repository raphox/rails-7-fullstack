import clsx from "clsx";

interface ListItemProps {
  id: number;
  name: string;
  selected: boolean;
  handleClick: Function;
}

export default function ListItem(props: ListItemProps) {
  function handleClick(event: any, id: number) {
    event.preventDefault();

    props.handleClick(id);
  }

  return (
    <li className="-mx-2">
      <a
        aria-label="Edit this kit_product"
        className={clsx(
          "flex items-center justify-between w-full p-2 rounded",
          { "bg-indigo-100": props.selected }
        )}
        href={`/kit/products/${props.id}`}
        onClick={(event) => handleClick(event, props.id)}
      >
        <div className="flex items-center truncate">
          <div className="truncate">
            <div className="text-sm font-medium">{props.name}</div>
          </div>
        </div>
      </a>
    </li>
  );
}
