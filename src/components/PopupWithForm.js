function PopupWithForm({
  name,
  title,
  button,
  isOpen,
  onClose,
  children,
  onSubmit
}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"} popup_${name}`}>
      <div className={`popup__container popup__container_${name}`}>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <button
          className={`popup__close button popup__close_${name}`}
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form form_${name}`}
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__button button popup__button_${name}`}
            aria-label={button}
            type="submit"
          >
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
