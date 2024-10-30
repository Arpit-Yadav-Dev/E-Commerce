import styles from "./HomePage.module.css";
import ProductList from "../../components/ProductList";
import CategoryList from "../../components/CategoryList";
import InputSearch from "../../components/InputSearch";
import PriceRange from "../../components/PriceRange";
import SortDropdown from "../../components/SortDropdown";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
  ResetFilter,
} from "../../slices/products/productsSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filter, cart } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleReset() {
    dispatch(ResetFilter());
  }
  function handleShowCart() {
    navigate("/cart");
  }

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.brand}>E-commerce</span>

        <button onClick={toggleSidebar} className={styles.sidebarToggle}>
          {isSidebarOpen ? '❌' : '🟰'}
        </button>
        <div className={styles.filter}>
          <InputSearch />
          <div className={styles.cart}>
            <SortDropdown />
            <span style={{ cursor: "pointer" }} onClick={handleShowCart}>
              🛒<sup>{cart.length}</sup>
            </span>
          </div>
        </div>
      </header>

      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <button onClick={toggleSidebar} className={styles.sidebarToggle}>
          {isSidebarOpen ? '❌' : '🟰'}
        </button>
        <h3>
          Filter
          {filter ? (
            <span style={{ cursor: "pointer" }} onClick={handleReset}>
              ❌
            </span>
          ) : null}
        </h3>
        <h4 className={styles.categoryTitle}>Categories</h4>
        <CategoryList />
        <h4 className={styles.priceTitle}>Price Range</h4>
        <PriceRange />
      </aside>

      <main className={styles.productList}>
        <ProductList />
      </main>

      <footer className={styles.footer}>
        <Pagination />
      </footer>
    </div>
  );
}

export default HomePage;
