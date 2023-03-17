import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({isOpen, onClose, onOverlayClose, onUpdateAvatar}){
  
    const[avatar, setAvatar] = React.useState()
    const [buttonText, setButtonText] = React.useState('Сохранить')

    React.useEffect(() =>{
        setAvatar('')
    }, [isOpen])

    function handleChangeAvatar(e){
        setAvatar(e.target.value)
      }

      function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatar,
        }, setButtonText);
      } 

  return(
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      >
        <input className="popup__input" onChange={handleChangeAvatar} value={avatar || ''} id="avatar-input" name="avatar" type="url" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error" id="avatar-input-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup