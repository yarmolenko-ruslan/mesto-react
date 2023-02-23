function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup-image ${card && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup-image__container">
        <button className="popup__close button" onClick={onClose}></button>
        <img className="popup-image__img" src={card?.link} alt={card?.name} />
        <p className="popup-image__title">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
