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

  const [profileInfo, setProfileInfo] = useState([]);
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(false);

  useEffect(() => {
    api.getUserInfo().then((result) => {
      setProfileInfo(result);
    });

    api.getInitialCards().then((result) => {
      setCards(result);
    });
  }, []);

  function handleEditAvatarClick() {
    setEditPopupAvatar(!isEditPopupAvatar);
  }

  function handleEditProfileClick() {
    setEditPopupProfile(!isEditPopupProfile);
  }

  function handleAddPlaceClick() {
    setEditPopupAddPlace(!isEditPopupAddPlace);
  }

  function handleCardClick(cards) {
    setSelectedCard(cards);
  }

  function closeAllPopups() {
    setEditPopupAvatar(false);
    setEditPopupProfile(false);
    setEditPopupAddPlace(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        isEditAvatarPopupOpen={isEditPopupAvatar}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        profileInfo={profileInfo}
        cards={cards}
        onCardClick={handleCardClick}
      />
      <PopupWithForm />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {isEditPopupAvatar && (
        <div className="popup popup-avatar popup_opened">
          <div className="popup__container">
            <h2 className="popup__title popup__title-change">
              Обновить аватар
            </h2>
            <button
              className="popup__close button"
              aria-label="Закрыть"
              type="button"
              onClick={closeAllPopups}
            ></button>
            <form className="popup__form" name="avatar_form" novalidate>
              <input
                className="popup__input popup__input_place_bottom popup__input-change"
                name="avatarLink"
                placeholder="Введите ссылку на аватар"
                type="url"
                required
              />
              <span
                className="popup__input-error input-avatar-error"
                id="avatarLinkError"
              ></span>
              <button
                className="popup__button button"
                aria-label="Сохранить"
                type="submit"
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditPopupProfile && (
        <div className="popup popup-profile popup_opened">
          <div className="popup__container">
            <h2 className="popup__title">Редактировать профиль</h2>
            <button
              className="popup__close button"
              aria-label="Закрыть"
              type="button"
              onClick={closeAllPopups}
            ></button>
            <form className="popup__form" name="profile_form" novalidate>
              <input
                className="popup__input popup__input_place_top"
                name="userName"
                value="Жак-Ив Кусто"
                placeholder="Имя"
                minlength="2"
                maxlength="40"
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
                minlength="2"
                maxlength="200"
                type="text"
                required
              />
              <span
                className="popup__input-error input-about-error"
                id="userAboutError"
              ></span>
              <button
                className="popup__button button"
                aria-label="Сохранить"
                type="submit"
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditPopupAddPlace && (
        <div className="popup popup-card popup_opened">
          <div className="popup__container">
            <h2 className="popup__title">Новое место</h2>
            <button
              className="popup__close button"
              aria-label="Закрыть"
              type="button"
              onClick={closeAllPopups}
            ></button>
            <form className="popup__form" name="card_form" novalidate>
              <input
                className="popup__input popup__input_place_top"
                id="input-name"
                name="cardName"
                minlength="2"
                maxlength="30"
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
              <button
                className="popup__button button"
                aria-label="Создать"
                type="submit"
              >
                Создать
              </button>
            </form>
          </div>
        </div>
      )}

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

      <template className="element-container">
        <li className="element" id="">
          <img className="element__image" src="#" alt="#" />
          <button
            className="element__trash-btn button"
            aria-label="Удалить карточку"
            type="button"
          ></button>
          <div className="element__info">
            <h2 className="element__title"></h2>
            <div className="element__like-container">
              <button
                className="element__like button"
                type="button"
                aria-label="Нравится"
              ></button>
              <span className="element__like-quantity">0</span>
            </div>
          </div>
        </li>
      </template>
    </div>
  );
}

export default App;
