import React, { useEffect } from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText = "Сохранить",
  onSubmit,
}) {
  

  useEffect(() => {

    const handleEscClose = (e) => {
      if (
        e.key === "Escape" ||
        e.target.classList.contains("popup__close") ||
        e.target.classList.contains("popup_opened")
      ) {
        onClose(e);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleEscClose);
      return () => {
        document.removeEventListener("keydown", handleEscClose);
        document.removeEventListener("mousedown", handleEscClose);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div>
      <div
        id={name}
        className={
          isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`
        }
      >
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form
            onSubmit={onSubmit}
            name={name}
            action="#"
            className="popup__form"
          >
            {children}
            <button type="submit" className="popup__save-btn">
              {buttonText}
            </button>
          </form>
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
