import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  function handleNavigate(id) {
    navigate(`/productDetails/${id}`);
  }

  return (
    <div
      key={product.id}
      className={styles.productCard}
      onClick={() => handleNavigate(product.id)}
    >
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <h6 className={styles.productTitle}>
        {`${product.title.split("").splice(0, 10).join("")}${
          product.title.length > 10 ? "..." : ""
        }`}
      </h6>
      <p className={styles.productPrice}>${product.price}</p>
      <small className={styles.productDescription}>
        {product.description.split("").slice(0, 40).join("") +
          (product.description.split("").length > 20 ? "..." : "")}
      </small>
    </div>
  );
}

export default ProductCard;
