import React from "react";
import { SortNameEnum, SortTitleEnum } from "../../redux/slices/filterSlice";

export const sortItems = [
  {
    name: SortNameEnum.RATING,
    id: 0,
    title: SortTitleEnum.POPULAR_DESC,
  },
  {
    name: SortNameEnum.RATING,
    id: 1,
    title: SortTitleEnum.POPULAR_ASC,
  },
  {
    name: SortNameEnum.PRICE,
    id: 2,
    title: SortTitleEnum.PRICE_DESC,
  },
  {
    name: SortNameEnum.PRICE,
    id: 3,
    title: SortTitleEnum.PRICE_ASC,
  },
  {
    name: SortNameEnum.TITLE,
    id: 4,
    title: SortTitleEnum.TITLE_DESC,
  },
  {
    name: SortNameEnum.TITLE,
    id: 5,
    title: SortTitleEnum.TITLE_ASC,
  },
];

export type SortType = {
  name: string
  id: number
  title: string
}

type sortBarProps = {
  clickOnSortItem: (obj: SortType) => void
  sort: SortType
}


const SortBar: React.FC<sortBarProps> = React.memo(({ clickOnSortItem, sort }) => {
  const sortRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & { path: Node[] }
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [open, setOpen] = React.useState(false);
  const selectMenuItem = (itemObj: SortType) => {
    clickOnSortItem(itemObj);
    console.log(itemObj, "itemobj")
    setOpen(false);
  };
  const filterSort = sortItems.filter((item) => item.id !== sort.id);
  return (
    <div>
      <div className="sort" ref={sortRef}>
        <div className="sort__label">
          {open && (
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              />
            </svg>
          )}

          <b>Сортировка по:</b>
          <span onClick={() => setOpen(!open)}> {sort.title}</span>
        </div>
        {open && (
          <div className="sort__popup">
            <ul>
              {filterSort.map((item) => (
                <li
                  key={item.id}
                  onClick={() => selectMenuItem(item)}
                  className={sort.id === item.id ? "active" : ""}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
})

export default SortBar;
