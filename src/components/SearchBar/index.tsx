import debounce from "lodash.debounce";
import React from "react";
import { setSearch } from "../../redux/slices/filterSlice";
import classes from "./SearchBar.module.scss";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [valueInput, setValueInput] = React.useState("");
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
    updateSearchValue(e.target.value);
  };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str));
    }, 1000),
    []
  );
  const clearInput = () => {
    setValueInput("");
    dispatch(setSearch(""));
    inputRef.current?.focus();
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchBar}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <title />
          <g id="search">
            <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
          </g>
        </svg>
      </div>
      <input
        ref={inputRef}
        className={classes.searchInput}
        placeholder="поиск..."
        onChange={handleSubmit}
        value={valueInput}
      ></input>
      {valueInput && (
        <div className={classes.clear} onClick={clearInput}>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 72 72"
            id="emoji"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="color" />
            <g id="hair" />
            <g id="skin" />
            <g id="skin-shadow" />
            <g id="line">
              <line
                x1="17.5"
                x2="54.5"
                y1="17.5"
                y2="54.5"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <line
                x1="54.5"
                x2="17.5"
                y1="17.5"
                y2="54.5"
                fill="none"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
