import Form from "./Form";
import SearchListItem from "./ListItem";

export interface SearchListProps {
  items: any[] | undefined;
  selectItem: any;
  handleSearch: (...args: any) => any;
  handleClickItem: Function;
}

export default function SearchList(props: SearchListProps) {
  const { handleSearch, items } = props;

  return (
    <div className="px-5 py-4">
      <div id="search-list">
        <Form handleSearch={handleSearch} />
        <div className="mt-4">
          <ul className="mb-6">
            {items &&
              items.map((item) => (
                <SearchListItem
                  handleClick={props.handleClickItem}
                  selected={props.selectItem && props.selectItem.id === item.id}
                  key={item.id}
                  {...item}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
