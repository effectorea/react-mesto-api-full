import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdatePlace }) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdatePlace({
      name: place,
      link: link,
    });
  }

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="addArticle"
      children={
        <div>
          <input
            required
            placeholder="Название"
            name="name"
            id="place"
            value={place}
            onChange={handlePlaceChange}
            type="text"
            className="popup__input"
            minLength="2"
            maxLength="30"
          />
          <span id="place-error" className="popup__error"></span>
          <input
            required
            placeholder="Ссылка на картинку"
            name="link"
            id="link"
            value={link}
            onChange={handleLinkChange}
            type="url"
            className="popup__input"
          />
          <span id="link-error" className="popup__error"></span>
        </div>
      }
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
export default AddPlacePopup;
