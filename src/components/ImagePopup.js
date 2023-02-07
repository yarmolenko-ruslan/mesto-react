function ImagePopup({ card, onClose }) {
  
  const name = card ? card.name : null;
  const link = card ? card.link : null;

  return (
    <div
      className={`popup popup-image ${card && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup-image__container">
        <button className="popup__close button" onClick={onClose}></button>
        <img className="popup-image__img" src={link} alt={name} />
        <p className="popup-image__title">{name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
