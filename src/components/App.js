import React from "react" 
import  "../index.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"
function App() {
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
const [isAddCardPopupOpen, setAddCardPopupOpen] = React.useState(false);
const [isAvatarProfilePopupOpen, setAvatarProfilePopupOpen] = React.useState(false);
const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
const [isSelectedCard, setSelectedCard] = React.useState({});

function handleEditProfileClick(){
  setEditProfilePopupOpen(true)
}

function handleAddPlaceClick(){
  setAddCardPopupOpen(true)
}

function handleEditAvatarClick() {
  setAvatarProfilePopupOpen(true)
}

function handleCardClick(data){
  setSelectedCard(data);
  setImagePopupOpen(true);
}

function closeAllPopups() {
  setEditProfilePopupOpen(false)
  setAddCardPopupOpen(false)
  setAvatarProfilePopupOpen(false)
  setImagePopupOpen(false)
}
  return(
    <div>
      <Header/>
      <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      />
      <Footer/>
      {/* попап профиля */}
      <PopupWithForm
      name={"edit"}
      title={"Реадактировать профиль"}
      buttonText={"Сохранить"}
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      >
        <input className="popup__input" id="name" name="name" type="text" placeholder="Ведите имя" minLength="2" maxLength="40" required />
        <span className="popup__input-error" id="name-error"></span>
        <input className="popup__input" id="profession" name="profession" type="text" placeholder="Укажите профессию" minLength="2" maxLength="200" required />
        <span className="popup__input-error" id="profession-error"></span>
      </PopupWithForm>
      {/* попап добавления карточки */}
      <PopupWithForm
      name={"add"}
      title={"Новое место"}
      buttonText={"Создать"}
      isOpen={isAddCardPopupOpen}
      onClose={closeAllPopups}
      >
        <input className="popup__input" id="title-input" name="title" type="text" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__input-error" id="title-input-error"></span>
        <input className="popup__input" id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error" id="link-input-error"></span>
      </PopupWithForm>
      {/* попап обновления аватара */}
      <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      isOpen={isAvatarProfilePopupOpen}
      onClose={closeAllPopups}
      >
        <input className="popup__input" id="avatar-input" name="avatar" type="url" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error" id="avatar-input-error"></span>
      </PopupWithForm>
      {/* попап изображения */}
      <ImagePopup
      card={isSelectedCard} 
      isOpen={isImagePopupOpen} 
      onClose={closeAllPopups}
      >
      </ImagePopup>
    </div>
    
  )
}
export default App