import React, { useState } from "react";
import "../styles/App.css";
import deleteImage from "../utils/deleteImg";

const PopupImg = (props) => {
  const { hidden, imageUrl, publicId, handleClickHidden, isAdmin, markers } =
    props;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  function handleClickShowDelete() {
    setShowDeleteDialog(!showDeleteDialog);
  }
  function handleClickDelete() {
    deleteImage(publicId, markers);
    setShowDeleteDialog(!showDeleteDialog);
    handleClickHidden();
  }

  return (
    <div className={hidden ? "PopupImg hidden" : "PopupImg"}>
      <div className="imageContainer">
        <div className="close" onClick={handleClickHidden}>
          close
        </div>
        <img loading="lazy" src={imageUrl}></img>
        {isAdmin && (
          <>
            <div className="delete" onClick={handleClickShowDelete}>
              Delete ❌
            </div>
            <div
              className={
                showDeleteDialog ? "deleteDialog" : "deleteDialog hidden"
              }
            >
              Are you sure?
              <button
                className="controlButton"
                type="button"
                onClick={handleClickDelete}
              >
                Delete
              </button>
              <button
                className="controlButton"
                type="button"
                onClick={handleClickShowDelete}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupImg;
