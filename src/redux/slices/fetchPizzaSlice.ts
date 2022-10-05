import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SortType } from "./filterSlice";

export enum StatusEnum {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

interface FetchPizzaType {
  products: ProductType[]
  status: StatusEnum
}

export type priceType = {
  type: number[]
  size: number[]
}

export type ProductType = {
  id: string
  title: string
  types: number[]
  sizes: number[]
  price: priceType
  imageUrl: string
  rating: number
  category: number
}

const initialState: FetchPizzaType = {
  products: [],
  status: StatusEnum.LOADING
};

export type FetchParamsType = {
  currentPage: number
  categorySort: string
  orderTypeSort: string
  searchSort: string
  sort: SortType
}

export const fetchPizza = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (params: FetchParamsType) => {
    const { currentPage, categorySort, orderTypeSort, searchSort, sort } =
      params;
    const { data } = await axios(
      `https://63076042c0d0f2b8012de65f.mockapi.io/products?page=${currentPage}&limit=4${categorySort}&sortBy=${sort.name}&order=${orderTypeSort}${searchSort}`
    );
    return data as ProductType[];
  }
);

export const fetchPizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPizza.pending, (state) => {
        state.status = StatusEnum.LOADING;
        state.products = [];
      });

    builder.addCase(
      fetchPizza.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = StatusEnum.SUCCESS
      });

    builder.addCase(
      fetchPizza.rejected, (state) => {
        state.status = StatusEnum.ERROR
        state.products = [];
      });
  }
})

export const { fetchProducts } = fetchPizzaSlice.actions;
export default fetchPizzaSlice.reducer;

export const fetchPizzaSelector = (state: RootState) => state.fetchPizza;
