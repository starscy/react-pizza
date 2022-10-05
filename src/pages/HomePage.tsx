import React, { useCallback } from "react";
import NavBar from "../components/navbar";
import Paginator from "../components/paginator";
import Products from "../components/products/Products";
import { useSelector } from "react-redux";
import {
  filterSelector,
  setCategoryId,
  setFilters,
  setSortId,
  SortNameEnum,
  SortTitleEnum,
} from "../redux/slices/filterSlice";
import * as qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizza } from "../redux/slices/fetchPizzaSlice";
import { useAppDispatch } from "../redux/store";
import { sortItems } from "../components/navbar/SortBar";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search, categoryId, sort, currentPage } = useSelector(filterSelector);
  const categorySort = categoryId ? `&category=${categoryId}` : "";
  const orderTypeSort = sort.title.includes("↓") ? "desc" : "asc";
  const searchSort = search ? `&search=${search}` : "";

  const getPizzas = async () => {
    dispatch(
      fetchPizza({
        currentPage,
        categorySort,
        sort,
        orderTypeSort,
        searchSort,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, search, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sort: sort.name,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sort, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortDefault = {
        name: SortNameEnum.RATING,
        id: 0,
        title: SortTitleEnum.POPULAR_DESC,
      }
      const sort = sortItems.find((obj) => obj.name === params.sort) || sortDefault;
      const categoryId = Number(params.categoryId);
      dispatch(setFilters({ ...params, sort, categoryId, search, currentPage }));
    }
  }, []);

  const clickOnCategory = useCallback((item: any) => {
    dispatch(setCategoryId(item));
  }, [])
  const clickOnSortItem = (item: any) => {
    dispatch(setSortId(item));
    console.log("item", item)
  };

  return (
    <div>
      <NavBar
        sort={sort}
        categoryId={categoryId}
        clickOnSortItem={clickOnSortItem}
        clickOnCategory={clickOnCategory}
      />
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        <Products />
      </div>
      <Paginator currentPage={currentPage} />
    </div>
  );
};

export default Home;
