import { useEffect, useState } from "react";

const loadingStyle = {
  width: "100%",
  height: "auto",
  maxWidth: "100%",
  maxHeight: "70vh",
  objectFit: "contain",
};

const gifs = {
  default:
    "https://i.pinimg.com/originals/5a/d0/47/5ad047a18772cf0488a908d98942f9bf.gif",
  emptyCart:
    "https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif",
  orderPlaced: "https://www.lappymaker.com/images/greentick-unscreen.gif",
};
function Loading({ type }) {
  const [loader, setloader] = useState();
  useEffect(() => {
    if (type == "emptyCart") setloader(gifs.emptyCart);
    else if (type == "orderPlaced") setloader(gifs.orderPlaced);
    else setloader(gifs.default);
  }, [type]);
  return (
    <img
      style={loadingStyle}
      src={loader}
      alt="Loading..."
    />
  );
}

export default Loading;
