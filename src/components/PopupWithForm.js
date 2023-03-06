function PopupWithForm(props) {
  return(
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={props.onClose}></button>
        <form className="popup__form" name={props.name} action="#" method="post" novalidate>
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
              <button className="popup__button-save" type="submit">{props.buttonText}</button>
            </form>
          </div>
        </section>
        )
}
export default PopupWithForm