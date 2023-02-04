function ImagePopup(props) {
  return (
    <div
      className={`popup popup-image ${props.card && "popup_opened"}`}
      onClick={props.onClose}
    >
      <div className="popup-image__container">
        <button
          className="popup__close button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup-image__img"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup-image__title">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
