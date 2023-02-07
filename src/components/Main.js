import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  profileInfo,
  cards,
  onCardClick
}) {
  return (
    <main className="content">
      <section className="profile">
        <img
          src={profileInfo.avatar}
          alt="Фотография пользователя"
          className="profile__avatar"
        />
        <div className="profile__cover" onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__info-title">{profileInfo.name}</h1>
          <p className="profile__info-subtitle">{profileInfo.about}</p>
          <button
            className="profile__info-button button"
            aria-label="Редактировать имя и информацию о себе"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button button"
          aria-label="Добавить новую карточку места"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card key={card._id} card={card} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
