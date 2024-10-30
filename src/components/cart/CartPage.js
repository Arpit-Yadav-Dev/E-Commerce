import { useDispatch, useSelector } from "react-redux";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import {
  decrementQuantity,
  EmptyCart,
  incrementQuantity,
} from "../../slices/products/productsSlice";
import Loading from "../Loading";
import { useState } from "react";

function CartPage() {
  const [orderNow, setOrderNow] = useState(false);
  const { cart, totalAmount } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleProductDetail(id) {
    console.log(id);
    navigate(`/productDetails/${id}`);
  }

  function handleOrder() {
    setOrderNow(true);
    setTimeout(() => {
      navigate("/");
      dispatch(EmptyCart());
    }, 2000);
  }

  if (orderNow) return <Loading type="orderPlaced" />;
  if (!cart.length > 0)
    return (
      <>
        <h1 className={styles.title}>Shopping Cart</h1>
        <Loading type="emptyCart" />
        <button onClick={() => navigate("/")} className={styles.checkoutButton}>
          ⬅️Back To Products
        </button>
      </>
    );
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.cartItems}>
        {cart.map((item) => (
          <div
            key={item.id}
            onClick={() => handleProductDetail(item.id)}
            className={styles.cartItem}
          >
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.details}>
              <h2 className={styles.productTitle}>{item.title}</h2>
              <p className={styles.price}>${item.price}</p>
              <div className={styles.quantityControl}>
                <button
                  disabled={item.quantity <= 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(decrementQuantity(item.id));
                  }}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(incrementQuantity(item.id));
                  }}
                  className={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <p>
          Total Price: <strong>${totalAmount}</strong>
        </p>
        <button onClick={handleOrder} className={styles.checkoutButton}>
          Order Now
        </button>
      </div>
    </div>
  );
}

export default CartPage;
