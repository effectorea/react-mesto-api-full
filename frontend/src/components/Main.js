import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div>
      <main className="content">
        <section className="profile">
          <div onClick={onEditAvatar} className="profile__wrapper">
            <img
              src={currentUser?.avatar}
              alt="Аватарка"
              className="profile__avatar"
            />
            <div className="profile__cover"></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-twin">
              <h1 className="profile__title">{currentUser?.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser?.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            type="button"
            className="profile__add-button"
          ></button>
        </section>
        <section className="elements">
          {cards && cards.map((element) => {
            return (
              <Card
                card={element}
                key={element._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Main;
