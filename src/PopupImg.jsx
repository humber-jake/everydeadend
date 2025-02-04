import React, { useState } from "react";
import "./App.css";

const PopupImg = (props) => {
  const { hidden, imageUrl, handleClickHidden } = props;

  return (
    <div className={hidden ? "PopupImg hidden" : "PopupImg"}>
      <div className="imageContainer">
        <img loading="lazy" src={imageUrl}></img>
        <div className="close" onClick={handleClickHidden}>
          x
        </div>
      </div>
    </div>
  );
};

export default PopupImg;
