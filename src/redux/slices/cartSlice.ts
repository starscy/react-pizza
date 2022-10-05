import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartSlice {
  totalPrice: number;
  products: CartProductType[];
}

export enum PizzaTypeEnum {
  THIN = "тонкое",
  NORMAL = "традиционное"
}

export type CartProductType = {
  id: string
  title: string
  type: string
  size: number
  price: number
  count: number
  imageUrl: string
}

const initialState: CartSlice = {
  totalPrice: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProductType>) => {
      const findedProduct = state.products.find(
        (product) => {
          return product.id === action.payload.id &&
            product.size === action.payload.size &&
            product.type === action.payload.type;
        }
      );
      if (findedProduct) {
        findedProduct.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.products.reduce((sum, product) => {
        return action.payload.price * product.count + sum;
      }, 0);
    },
    subProduct: (state, action: PayloadAction<CartProductType>) => {
      const findedProduct = state.products.find(
        (product) =>  {
          return product.id === action.payload.id &&
            product.size === action.payload.size &&
            product.type === action.payload.type;
        }
      );
      if (findedProduct) {
        findedProduct.count--;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.totalPrice = state.products.reduce((sum, product) => {
        return product.price * product.count + sum;
      }, 0);
    },
    deleteAllProducts: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, deleteProduct, deleteAllProducts, subProduct } =
  cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state: RootState) => state.cart;
export const FindProductCartSelector = (id: string) => (state: RootState) =>
  state.cart.products.find((product) => product.id === id);
