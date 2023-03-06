function Card(props) {
  function handleCardClick(){
    props.onCardClick(props.card)
  }

  return (
      <li className="element">
        <button className="element__image-button">
          <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleCardClick}/>
        </button>
        <button className="element__button-trash" type="button" onClick={props.onTrash}></button>
        <div className="element__title-container">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button className="element__button-like" type="button"></button>
            <p className="element__quantity-like">{props.card.likes.length}</p>
          </div>
        </div>
      </li> 
  )
}
export default Card