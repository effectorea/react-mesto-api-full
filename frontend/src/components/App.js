import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/Auth";
import InfoTooltip from "./infoTooltip";

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(true);

  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            console.log(res)
            setEmail(res.email);
            setLoggedIn(true);
            history.push('/');
          } else {
            localStorage.removeItem(jwt);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history, jwt]);

  useEffect(() => {
    if (loggedIn) {
      api.getCards(jwt).then((res) => {
        console.log(res.data);
        setCards(res.data);
      });
      api
        .getUserInfo(jwt)
        .then((res) => {
          console.log(res);
          setCurrentUser(res);
        })
        .catch((err) => console.log(`Ошибка при загрузке данных ${err}`));
    }
  }, [loggedIn, jwt]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleUpdateUser = (info) => {
    api
      .setInfo(info, jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке данных пользователя ${err}`);
      });
  };

  const handleUpdateAvatar = (info) => {
    api
      .setUserAvatar(info, jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке аватара ${err}`);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .switchLike(card._id, isLiked, jwt)
      .then((res) =>
        setCards((state) => state.map((c) => (c._id === card._id ? res : c)))
      )
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    api
      .deleteCard(deletedCard._id, jwt)
      .then(() =>
        setCards((state) => state.filter((c) => c._id !== deletedCard._id))
      )
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleConfirmationClick(data) {
    setDeletedCard(data);
    setIsConfirmationPopupOpen(true);
  }

  function handleUpdatePlace(card) {
    api
      .addCard(card, jwt)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке карточки ${err}`);
      });
  }
  function handleRegistration({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setStatus(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setStatus(false);
        console.log(err);
      });
  }

  function handleLoggingIn({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        console.log(res.user)
        if (res.token) {
          setEmail(email);
          setLoggedIn(true);
          setCurrentUser({})
          localStorage.setItem('jwt', res.token);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setStatus(false);
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setEmail('');
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header email={email} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmationClick}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegistration} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLoggingIn} />
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdatePlace={handleUpdatePlace}
          />

          <PopupWithConfirm
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            handleConfirmation={handleCardDelete}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            status={status}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
