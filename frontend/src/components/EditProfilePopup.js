import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profileEdit"
      children={
        <div>
          <input
            required
            placeholder="Имя"
            name="name"
            value={name || ''}
            onChange={handleNameChange}
            id="name"
            type="text"
            minLength="2"
            maxLength="40"
            className="popup__input popup__input_add_name"
          />
          <span id="name-error" className="popup__error"></span>
          <input
            required
            placeholder="Профессиональная деятельность"
            name="about"
            value={description || ''}
            onChange={handleDescriptionChange}
            id="about"
            type="text"
            minLength="2"
            maxLength="200"
            className="popup__input popup__input_add_mission"
          />
          <span id="about-error" className="popup__error"></span>
        </div>
      }
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default EditProfilePopup;
