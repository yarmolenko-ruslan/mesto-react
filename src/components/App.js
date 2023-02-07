import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import api from "../utils/Api";

function App() {
  const [isEditPopupAvatar, setEditPopupAvatar] = useState(false);
  const [isEditPopupProfile, setEditPopupProfile] = useState(false);
  const [isEditPopupAddPlace, setEditPopupAddPlace] = useState(false);

  const [profileInfo, setProfileInfo] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((result) => {
        setProfileInfo(result);
      })
      .catch((err) => {
        console.error(err);
      });

    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.error(err);
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

  return (
    <div className="page">
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        profileInfo={profileInfo}
        cards={cards}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        button=" Сохранить"
        isOpen={isEditPopupAvatar}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_place_bottom popup__input-change"
          name="avatarLink"
          placeholder="Введите ссылку на аватар"
          type="url"
          required
        />
      </PopupWithForm>

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen={isEditPopupProfile}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_place_top"
          name="userName"
          value="Жак-Ив Кусто"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          type="text"
          required
        />
        <span
          className="popup__input-error input-name-error"
          id="userNameError"
        ></span>
        <input
          className="popup__input popup__input_place_bottom"
          name="userAbout"
          value="Исследователь океана"
          placeholder="Род занятия"
          minLength={2}
          maxLength={200}
          type="text"
          required
        />
        <span
          className="popup__input-error input-about-error"
          id="userAboutError"
        ></span>
      </PopupWithForm>

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
  );
}

export default App;
