import React from "react";
import Categories from "./Categories";
import SortBar, { SortType } from "./SortBar";

type navBarProps = {
  categoryId: number
  clickOnCategory: (i: number) => void
  sort: SortType
  clickOnSortItem: (obj: SortType) => void
}

const NavBar: React.FC<navBarProps> = ({ categoryId, clickOnCategory, sort, clickOnSortItem }) => {
  return (
    <div className="content__top">
      <Categories
        categoryId={categoryId}
        clickOnCategory={clickOnCategory}
      />
      <SortBar sort={sort} clickOnSortItem={clickOnSortItem} />
    </div>
  );
};

export default NavBar;
