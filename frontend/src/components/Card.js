import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner.toString() === currentUser._id.toString();

  const isLiked = card.likes.some((i) => i.toString() === currentUser._id.toString());

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div>
      <article className="element">
        <button
          type="button"
          className={
            isOwn
              ? "element__trasher"
              : "element__trasher element__trasher_disabled"
          }
          onClick={handleDeleteClick}
        ></button>
        <img
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
          className="element__image"
        />
        <div className="element__info">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__container">
            <button
              onClick={handleLikeClick}
              type="button"
              className={
                isLiked
                  ? "element__heart element__heart_active"
                  : "element__heart"
              }
            ></button>
            <span className="element__counter">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Card;
