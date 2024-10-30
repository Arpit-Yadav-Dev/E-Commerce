import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "../slices/products/productsSlice";

const priceRangeStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px",
  },
  input: {
    width: "50px",
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  separator: {
    padding: "0 5px",
    fontWeight: "bold",
  },
};

function PriceRange() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.filter);

  function handlePriceChange() {
    dispatch(setPriceRange({ min, max }));
  }

  useEffect(() => {
    if (!filter) {
      setMin(0);
      setMax(1000);
    }
  }, [filter]);

  return (
    <div style={priceRangeStyles.container}>
      <input
        type="number"
        value={min}
        min={0}
        onChange={(e) => setMin(Number(e.target.value))}
        onBlur={handlePriceChange}
        style={priceRangeStyles.input}
      />
      <span style={priceRangeStyles.separator}>to</span>
      <input
        type="number"
        value={max}
        max={1000}
        onChange={(e) => setMax(Number(e.target.value))}
        onBlur={handlePriceChange}
        style={priceRangeStyles.input}
      />
    </div>
  );
}

export default PriceRange;
