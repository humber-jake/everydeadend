import React, { useState } from "react";
import "./App.css";

const PopupImg = (props) => {
  const { hidden, imageUrl, handleClickHidden } = props;

  return (
    <div className={hidden ? "PopupImg hidden" : "PopupImg"}>
      <div className="imageContainer">
        <div className="close" onClick={handleClickHidden}>
          close
        </div>
        <img loading="lazy" src={imageUrl}></img>
      </div>
    </div>
  );
};

export default PopupImg;
