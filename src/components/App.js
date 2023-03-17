import React from "react" 
import  "../index.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import DelitePlacePopup from "./DelitePlacePopup"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import { api } from "../utils/api"

function App() {
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
const [isAddCardPopupOpen, setAddCardPopupOpen] = React.useState(false);
const [isAvatarProfilePopupOpen, setAvatarProfilePopupOpen] = React.useState(false);
const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
const [isSelectedCard, setSelectedCard] = React.useState({});
const [isDelitePopupOpen, setDelitePopupOpen] =React.useState(false)
const [currentUser, setCurrentUser] = React.useState({});
const [cards, setCards] = React.useState([])

React.useEffect(() => {
  api.getUserInfo()
    .then((data) => {
      setCurrentUser(data)
    })
    .catch((err) => console.log(err))
}, [])

React.useEffect(() => {
  api.getInitialCards()
    .then((data) => {
      setCards(data)
    })
    .catch((err) => console.log(err))
}, [])




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

function handleDeliteClick(card){
  setSelectedCard(card)
  setDelitePopupOpen(true)
}

function handleOverlayClick(e){
  if (e.target.classList.contains('popup_is-opened') || e.target.classList.contains('popup__button-close')) {
    closeAllPopups();
  }
}

function handleUpdateUser(newUserInfo, setButtonStatus){
  setButtonStatus('Сохранение...')
  api.changeUserInfo(newUserInfo)
  .then((data) => {
    setCurrentUser(data)
  })
  .then(() => closeAllPopups())
  .catch((err) => console.log(err))
  .finally(() => setButtonStatus('Сохранить'))
}

function handleUpdateAvatar(formData, setButtonStatus){
  setButtonStatus('Сохранение...')
   api.changeUserAvatar(formData)
   .then((data) => {
    setCurrentUser(data)
   })
   .then(() => closeAllPopups())
   .catch((err) => console.log(err))
   .finally(() => setButtonStatus('Сохранить'))
}

function handleAddCard(newCard, setButtonStatus){
  setButtonStatus('Сохранение...')
  api.uploadNewCard(newCard)
  .then((data) =>{
    setCards([data, ...cards]);
  })
  .then(() => closeAllPopups())
  .catch((err) => console.log(err))
  .finally(() => setButtonStatus('Создать'))
}

function handleDeliteCard(setButtonStatus){
  setButtonStatus('Удаление...')
  api.deleteCard(isSelectedCard._id)
  .then(() => {
    setCards(cards.filter((c) => c._id !== isSelectedCard._id))
  })
  .then(() => closeAllPopups())
  .catch(err => console.log(err))
  .finally(() => setButtonStatus('Да'))
}


function handleLikeClick(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
}

function closeAllPopups() {
  setEditProfilePopupOpen(false)
  setAddCardPopupOpen(false)
  setAvatarProfilePopupOpen(false)
  setImagePopupOpen(false)
  setDelitePopupOpen(false)
}
  return(
    <div>
      <Header/>
      <CurrentUserContext.Provider value={currentUser}>
      <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      cards={cards}
      onDeliteClick={handleDeliteClick}
      onLikeClick={handleLikeClick}
      />
      <Footer/>
      {/* попап профиля */}
      <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onOverlayClose={handleOverlayClick}
      onUpdateUser={handleUpdateUser}
      >
      </EditProfilePopup>
      {/* попап добавления карточки */}
      <AddPlacePopup
      isOpen={isAddCardPopupOpen}
      onClose={closeAllPopups}
      onOverlayClose={handleOverlayClick}
      onAddPlace={handleAddCard}
      ></AddPlacePopup>
      {/* попап обновления аватара */}
      <EditAvatarPopup 
      isOpen={isAvatarProfilePopupOpen} 
      onClose={closeAllPopups} 
      onOverlayClose={handleOverlayClick} 
      onUpdateAvatar={handleUpdateAvatar}
      >
      </EditAvatarPopup>
      {/* попап удаления */}
      <DelitePlacePopup
      isOpen={isDelitePopupOpen}
      onClose={closeAllPopups}
      onOverlayClose={handleOverlayClick}
      onDeletePlace={handleDeliteCard}
      ></DelitePlacePopup>
      {/* попап изображения */}
      <ImagePopup
      card={isSelectedCard} 
      isOpen={isImagePopupOpen} 
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}
      >
      </ImagePopup>
      </CurrentUserContext.Provider>
    </div>
    
  )
}
export default App