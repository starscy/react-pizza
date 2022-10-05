import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCardSkeleton from "../components/products/ProductCardSkeleton";
import { Link } from "react-router-dom";

const ProductInfo: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>();
  const fetchProduct = async () => {
    try {
      const { data } = await axios(
        `https://63076042c0d0f2b8012de65f.mockapi.io/products/${id}`
      );
      setPizza(data);
    } catch (error) {
      alert(error);
      navigate("/");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      {!pizza ? (
        <ProductCardSkeleton />
      ) : (
        <div className="pizza-block">
          <img
            className="pizza-block__image"
            src={pizza.imageUrl}
            alt={pizza.title}
          />
          <h4 className="pizza-block__title">{pizza.title}</h4>
          <div className="pizza-block__price"> {pizza.price}</div>
        </div>
      )}
      <div className="cart__bottom-buttons">
        <Link
          to="/"
          className="button button--outline button--add go-back-btn"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>

          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default ProductInfo;
