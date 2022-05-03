import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm({ isOpen, onClose, handleConfirmation }) {
  const handleDeleteCard = (e) => {
    e.preventDefault();
    handleConfirmation();
  };
  return (
    <PopupWithForm
      name="confirmDelete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
      onSubmit={handleDeleteCard}
    />
  );
}

export default PopupWithConfirm;
