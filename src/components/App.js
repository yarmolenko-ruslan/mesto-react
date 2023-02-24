import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditPopupAvatar, setEditPopupAvatar] = useState(false);
  const [isEditPopupProfile, setEditPopupProfile] = useState(false);
  const [isEditPopupAddPlace, setEditPopupAddPlace] = useState(false);

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

  function handleUpdateCard({ name, link }) {
    api
      .postCard({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
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
        <AddPlacePopup
          isOpen={isEditPopupAddPlace}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
