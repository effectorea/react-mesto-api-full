import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatarEdit"
      children={
        <div>
          <input
            required
            placeholder="Ссылка на картинку"
            name="avatar"
            id="avatar"
            ref={avatarRef}
            type="url"
            className="popup__input popup__input_change_avatar"
          />
          <span id="avatar-error" className="popup__error"></span>
        </div>
      }
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
export default EditAvatarPopup;
