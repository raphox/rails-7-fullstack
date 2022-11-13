import Form from "./Form";
import SearchListItem from "./ListItem";

export interface SearchListProps {
  items: any[];
  selectedItem: any;
  handleSearch: (...args: any) => any;
  handleClickItem: Function;
}

export default function SearchList(props: SearchListProps) {
  const { handleSearch, handleClickItem, items, selectedItem } = props;

  return (
    <div className="px-5 py-4">
      <div id="search-list">
        <Form handleSearch={handleSearch} />

        <div className="mt-4">
          <ul className="mb-6">
            {items.map((item) => (
              <SearchListItem
                handleClick={handleClickItem}
                selected={selectedItem?.id === item.id}
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
