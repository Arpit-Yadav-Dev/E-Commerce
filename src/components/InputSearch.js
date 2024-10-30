import React, { useRef, useState } from "react";
import { setSearchQuery } from "../slices/products/productsSlice";
import { useDispatch } from "react-redux";

const inputStyling = {
  width: "60%",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontSize: "16px",
  transition: "box-shadow 0.3s ease",
};

function InputSearch() {
  const [text, setText] = useState("");
  const timeout = useRef(null);
  const dispatch = useDispatch();

  function handleDebouncing(e) {
    setText(e.target.value);
    const value = e.target.value;

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      dispatch(setSearchQuery(value));
    }, 1000);
  }

  return (
    <input
      style={inputStyling}
      type="text"
      value={text}
      onChange={handleDebouncing}
      placeholder="Search by name"
    />
  );
}

export default InputSearch;
