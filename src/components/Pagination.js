import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductInLimit } from "../slices/products/productsSlice";

const paginationStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    maxWidth:'100%',
    overflowX:'scroll'
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    gap: "8px",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "black",
    color: "white",
    // fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

function Pagination() {
  const [limit, setlimit] = useState(5);
  const [pages, setPages] = useState();
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);

  function handleLimit(e) {
    setlimit(e.target.value);
    dispatch(fetchProductInLimit(e.target.value));
  }

  useEffect(() => {
    const totalData = 40;
    const pg = Math.ceil(totalData / limit);
    setPages(pg);
    setActive(1);
  }, [limit]);

  if (status === "loading") {
    return null;
  }

  return (
    <div style={paginationStyles.container}>
      <select
        value={limit}
        onChange={handleLimit}
        style={paginationStyles.select}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>All</option>
      </select>
      <div style={paginationStyles.buttonContainer}>
        {Array.from({ length: pages }, (_, index) => {
          let fontSize = index + 1 == active ? "20px" : "14px";
          return (
            <button
              key={index}
              onClick={() => setActive(index + 1)}
              style={{
                ...paginationStyles.button,
                fontSize: fontSize,
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Pagination;
