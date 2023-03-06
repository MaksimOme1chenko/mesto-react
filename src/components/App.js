import React from "react" 
import  "../index.css"
import Header from "./header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import PopupWithImage from "./PopupWithImage"
function App() {
const [editProfilePopupOpen, isEditProfilePopupOpen] = React.useState(false);
const [addCardPopupOpen, isAddCardPopupOpen] = React.useState(false);
const [avatarProfilePopupOpen, isAvatarProfilePopupOpen] = React.useState(false);
const [imagePopupOpen, isImagePopupOpen] = React.useState(false)
const [selectedCard, isSelectedCard] = React.useState({});

function handleEditProfileClick(){
  isEditProfilePopupOpen(true)
}

function handleAddPlaceClick(){
  isAddCardPopupOpen(true)
}

function handleEditAvatarClick() {
  isAvatarProfilePopupOpen(true)
}

function handleCardClick(data){
  isSelectedCard(data);
  isImagePopupOpen(true);
}

function closeAllPopups() {
  isEditProfilePopupOpen(false)
  isAddCardPopupOpen(false)
  isAvatarProfilePopupOpen(false)
  isImagePopupOpen(false)
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
      isOpen={editProfilePopupOpen}
      onClose={closeAllPopups}
      >
        <input className="popup__input" id="name" name="name" type="text" placeholder="Ведите имя" minlength="2" maxlength="40" required />
        <span className="popup__input-error" id="name-error"></span>
        <input className="popup__input" id="profession" name="profession" type="text" placeholder="Укажите профессию" minlength="2" maxlength="200" required />
        <span className="popup__input-error" id="profession-error"></span>
      </PopupWithForm>
      {/* попап добавления карточки */}
      <PopupWithForm
      name={"add"}
      title={"Новое место"}
      buttonText={"Создать"}
      isOpen={addCardPopupOpen}
      onClose={closeAllPopups}
      >
        <input className="popup__input" id="title-input" name="title" type="text" placeholder="Название" minlength="2" maxlength="30" required value=""/>
        <span className="popup__input-error" id="title-input-error"></span>
        <input className="popup__input" id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required value=""/>
        <span className="popup__input-error" id="link-input-error"></span>
      </PopupWithForm>
      {/* попап обновления аватара */}
      <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      isOpen={avatarProfilePopupOpen}
      onClose={closeAllPopups}
      >
        <input className="popup__input" id="avatar-input" name="avatar" type="url" placeholder="Ссылка на картинку" required value=""/>
        <span className="popup__input-error" id="avatar-input-error"></span>
      </PopupWithForm>
      {/* попап изображения */}
      <PopupWithImage
      card={selectedCard} 
      isOpen={imagePopupOpen} 
      onClose={closeAllPopups}
      >
      </PopupWithImage>
    </div>
    
  )
}
export default App