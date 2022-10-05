import React from "react";
import ContentLoader from "react-content-loader";

const ProductCardSkeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={600}
    viewBox="0 0 280 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="310" rx="10" ry="10" width="280" height="90" />
    <circle cx="135" cy="130" r="125" />
    <rect x="134" y="420" rx="15" ry="15" width="150" height="44" />
    <rect x="6" y="430" rx="0" ry="0" width="100" height="22" />
  </ContentLoader>
);

export default ProductCardSkeleton;
