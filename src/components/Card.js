function Card({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  };
  return (
    <li className="element">
      <button
        className="element__trash-btn button"
        aria-label="Удалить карточку"
        type="button"
      ></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            className="element__like button"
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__like-quantity">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
