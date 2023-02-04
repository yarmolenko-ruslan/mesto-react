import Card from "./Card";

function Main(props) {

  return (
    <main className="content">
      <section className="profile">
        <img
          src={props.profileInfo.avatar}
          alt="Фотография пользователя"
          className="profile__avatar"
        />
        <div className="profile__cover" onClick={props.onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__info-title">{props.profileInfo.name}</h1>
          <p className="profile__info-subtitle">{props.profileInfo.about}</p>
          <button
            className="profile__info-button button"
            aria-label="Редактировать имя и информацию о себе"
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button button"
          aria-label="Добавить новую карточку места"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => {

            return (
              <Card
                titleCard={card.name}
                linkCard={card.link}
                idCard={card._id}
                likeCard={card.likes.length}
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
