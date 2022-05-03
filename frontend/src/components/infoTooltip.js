import React from "react";
import success from "../images/success.svg";
import failure from "../images/failure.svg";

function infoTooltip({ status, onClose, isOpen }) {
  return (
    <div
      id="infoTooltip"
      className={isOpen ? `popup popup_opened` : `popup`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img
          src={status ? success : failure}
          alt="Статус"
          className="popup__status"
        />
        <h2 className="popup__title-status">
          {status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default infoTooltip;
