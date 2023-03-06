function ImagePopup(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_is-opened" : ""}`} >
      <div className="popup__image-container">
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h3 className="popup__signature">{props.card.name}</h3>
      </div>
    </section >)
}
export default ImagePopup