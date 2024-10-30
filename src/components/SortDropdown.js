import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSortedProduct } from "../slices/products/productsSlice";

const selectStyles = {
  // width: "60%",
  // padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "#f9f9f9",
  fontSize: "16px",
  color: "#333",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease",
  outline: "none",
};

function SortDropdown() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");

  function handleSortChange(e) {
    setSort(e.target.value);
    dispatch(fetchSortedProduct(e.target.value));
  }

  return (
    <>
      <select style={selectStyles} value={sort} onChange={handleSortChange}>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </>
  );
}

export default SortDropdown;
