import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div>
      <div
        id="imageBigPopup"
        className={card ? `popup popup_opened` : `popup`}
        onClick={onClose}
      >
        <div className="popup__content">
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
          <img src={card?.link} alt={card?.name} className="popup__image" />
          <span className="popup__place-name">{card?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
