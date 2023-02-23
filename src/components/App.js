import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditPopupAvatar, setEditPopupAvatar] = useState(false);
  const [isEditPopupProfile, setEditPopupProfile] = useState(false);
  const [isEditPopupAddPlace, setEditPopupAddPlace] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    document.title = "Project Mesto-React";
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.error(err);
      });

    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  function handleEditAvatarClick() {
    setEditPopupAvatar(true);
  }

  function handleEditProfileClick() {
    setEditPopupProfile(true);
  }

  function handleAddPlaceClick() {
    setEditPopupAddPlace(true);
  }

  function closeAllPopups() {
    setEditPopupAvatar(false);
    setEditPopupProfile(false);
    setEditPopupAddPlace(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const setNewCards = (id, newCard) => {
    setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLikes(card._id, !isLiked)
        .then((newCard) => {
          setNewCards(card._id, newCard);
        })
        .catch((err) => console.error(err));
    } else {
      api
        .putLikes(card._id, isLiked)
        .then((newCard) => {
          setNewCards(card._id, newCard);
        })
        .catch((err) => console.error(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo({ name: name, about: about })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchUserAvatar({ avatar: avatar })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditPopupProfile}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditPopupAvatar}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="card"
          title="Новое место"
          button="Создать"
          isOpen={isEditPopupAddPlace}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_place_top"
            id="input-name"
            name="cardName"
            minLength={2}
            maxLength={30}
            placeholder="Название"
            type="text"
            required
          />
          <span
            className="popup__input-error input-title-error"
            id="cardNameError"
          ></span>
          <input
            className="popup__input popup__input_place_bottom"
            id="input-link"
            name="cardLink"
            placeholder="Ссылка на картинку"
            type="url"
            required
          />
          <span
            className="popup__input-error input-link-error"
            id="cardLinkError"
          ></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <div className="popup popup-confirmation">
          <div className="popup__container">
            <h2 className="popup__title popup__title-delete">Вы уверены?</h2>
            <button
              className="popup__close button"
              aria-label="Закрыть"
              type="button"
            ></button>
            <button
              className="popup__button button popup__button-delete"
              aria-label="Да"
              type="submit"
            >
              Да
            </button>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
