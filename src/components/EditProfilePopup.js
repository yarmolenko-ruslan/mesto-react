import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function hendleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(el) {
    el.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });

    onClose();
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_place_top"
        name="userName"
        value={name}
        onChange={hendleChangeName}
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
        value={description}
        onChange={handleChangeDescription}
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
  );
}

export default EditProfilePopup;
