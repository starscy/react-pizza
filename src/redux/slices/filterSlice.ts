import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface FilterSliceType {
  search: string
  categoryId: number
  currentPage: number
  sort: SortType
}

export enum SortNameEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title"
}

export enum SortTitleEnum {
  POPULAR_DESC = "популярности ↓",
  POPULAR_ASC = "популярности ↑",
  PRICE_DESC = "цене ↓",
  PRICE_ASC = "цене ↑",
  TITLE_DESC = "алфавиту ↓",
  TITLE_ASC = "алфавиту ↑",
}

export type SortType = {
  name: SortNameEnum
  id: number
  title: SortTitleEnum
}

const initialState: FilterSliceType = {
  search: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: SortNameEnum.RATING,
    id: 0,
    title: SortTitleEnum.POPULAR_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filterAndSort",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortId: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceType>) => {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSortId,
  setCurrentPage,
  setFilters,
  setSearch,
} = filterSlice.actions;
export default filterSlice.reducer;

export const filterSelector = (state: RootState) => state.filter;


