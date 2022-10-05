import React from "react";
import { useSelector } from "react-redux";
import { fetchPizzaSelector, StatusEnum } from "../../redux/slices/fetchPizzaSlice";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";


const Products = () => {
  const { products, status } = useSelector(fetchPizzaSelector);
  return (
    <>
      {status === StatusEnum.ERROR ? (
        <>
          <h2>
            Нет товаров. <span>😕</span>
          </h2>
          <p>
            Вероятней всего проблемы с сервером.
            <br />
            Попробуйте позднее.
          </p>
        </>
      ) : status === StatusEnum.LOADING ? (
        [...new Array(6)].map((_, index) => <ProductCardSkeleton key={index} />)
      ) : (
        products.map((product) => <ProductCard {...product} key={product.id} />)
      )}
    </>
  );
};

export default Products;
