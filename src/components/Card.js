function Cards(props) {

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  return (
    <li className="element">
      <img
        className="element__image"
        src={props.linkCard}
        alt={props.titleCard}
        onClick={handleCardClick} 
      />
      <button
        className="element__trash-btn button"
        aria-label="Удалить карточку"
        type="button"
      ></button>
      <div className="element__info">
        <h2 className="element__title">{props.titleCard}</h2>
        <div className="element__like-container">
          <button
            className="element__like button"
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__like-quantity">{props.likeCard}</span>
        </div>
      </div>
    </li>
  );
}

export default Cards;