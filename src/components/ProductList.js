import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./productcard/ProductCard";
import Loading from "./Loading";

function ProductList() {
  const { items, status, error } = useSelector((state) => state.products);
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <p>Error:{error}</p>;
  }
  return (
    <>
      <small style={{ color: "grey",marginLeft:'5px' }}>showing {items.length} results</small>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {items &&
          items.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </>
  );
}

export default ProductList;
