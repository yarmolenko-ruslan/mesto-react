function PopupWithForm({name, title, children, isOpen, isClose}) {
  
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <button
            className="popup__close button"
            aria-label="Закрыть"
            type="button"
            onClick={isClose}
          ></button>
          <form className="popup__form" name={`${name}`} novalidate>
            {children}
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
  )
}

export default PopupWithForm;