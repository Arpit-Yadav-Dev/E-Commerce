import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveFromCart } from "../../slices/products/productsSlice";
import Loading from "../Loading";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const [itemExistInCart, setitemExistInCart] = useState(false);
  const cart = useSelector((state) => state.products.cart);

  // async function fetchSingleProduct(productId) {
  //   const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);
  //   return res.data;
  // }

  useEffect(() => {
    const fetchSingleProduct = async (productId) => {
      setloading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setloading(false);
      }
    };
    fetchSingleProduct(id);
  }, [id]);

  function handleCart() {
    dispatch(AddToCart({ ...product, quantity: 1 }));
  }

  function removeProduct() {
    dispatch(RemoveFromCart(id));
  }

  function handleMoveToCart() {
    navigate("/cart");
  }

  useEffect(() => {
    let inCart = cart.some((item) => item.id == id);
    setitemExistInCart(inCart);
  }, [cart]);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <Loading />;
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.description}>{product.description}</p>
        {itemExistInCart ? (
          <button onClick={removeProduct} className={styles.buttonRemove}>
            Remove from Cart
          </button>
        ) : (
          <button onClick={handleCart} className={styles.button}>
            Add to Cart
          </button>
        )}

        {cart.length > 0 ? (
          <button onClick={handleMoveToCart} className={styles.moveToCart}>
            Cart 🛒
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetails;
