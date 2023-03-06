import { useEffect, useState } from "react"
// import Avatar from "../images/image.jpg"
import { api } from "../utils/api"
import Card from "./Card"



function Main(props) {
  const[userName, setUserName] = useState("")
  const[userDescription, setuserDescription] = useState("")
  const[userAvatar, setuserAvatar] = useState("")
  const[cards, setCards] = useState([])

// function handleDeliteCardClick(){
//   setDeliteCardPopupOpen(true)
// }
  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setuserDescription(data.about);
        setuserAvatar(data.avatar);
      })
      .catch((err) => console.log(err))
  }, [])
  useEffect(() =>{
    api.getInitialCards()
    .then((data) =>{
      setCards(data)
    })
  })

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" alt="Аватарка" src={userAvatar} />
          <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__button-edit" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__profession">{userDescription}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <ul className="cards" key={card._id}>
              <Card 
              card={card}
              onCardClick={props.onCardClick}
              />
            </ul>
          )
        })}
      </section>
    </main>
  )
}
export default Main