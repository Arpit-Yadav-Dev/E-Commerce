import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ProductDetails from "./components/singleProductDetails/ProductDetails";
import CartPage from "./components/cart/CartPage";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
