function Cards({ titleCard, linkCard, likeCard, card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  return (
    <li className="element">
      <img
        className="element__image"
        src={linkCard}
        alt={titleCard}
        onClick={handleCardClick}
      />
      <button
        className="element__trash-btn button"
        aria-label="Удалить карточку"
        type="button"
      ></button>
      <div className="element__info">
        <h2 className="element__title">{titleCard}</h2>
        <div className="element__like-container">
          <button
            className="element__like button"
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__like-quantity">{likeCard}</span>
        </div>
      </div>
    </li>
  );
}

export default Cards;
