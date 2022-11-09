import "./search-panel.css";

const SearchPanel = () => {
  const searchText = "What needs to be done?";

  return (
    <input
      type="text"
      className="new-todo form-control search-input"
      placeholder={searchText}
      autoFocus
    />
  );
};

export default SearchPanel;
