import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByCategory } from "../slices/products/productsSlice";

const categoryStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    cursor: "pointer",
  },
  radio: {
    marginRight: "8px",
    accentColor: "blue",
  },
  label: {
    fontSize: "16px",
    color: "grey",
  },
};

function CategoryList() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.filter);
  const [selected, setselected] = useState("");
  const categories = useSelector((state) => state.products.categories);

  function handleCategory(e) {
    let value = e.target.value;
    setselected(value);
    dispatch(fetchProductByCategory(value));
  }

useEffect(()=>{
if(!filter){
  setselected("")
}
},[filter])

  return (
    <>
      {categories &&
        categories.map((cat) => (
          <div key={cat} style={categoryStyles.container}>
            <input
              type="radio"
              onChange={handleCategory}
              style={categoryStyles.radio}
              name="category"
              value={cat}
              checked={cat === selected}
            />
            <span style={categoryStyles.label}>{cat}</span>
          </div>
        ))}
    </>
  );
}

export default CategoryList;
