import { useEffect, useState } from 'react'
import './App.css'
import Form from './Form'
import "leaflet/dist/leaflet.css"; 
import Map from './Map'



//פונקציית לקבלת רשימת כל פרטי הטפסים מהלוקלסטורג
const getFromLocalStorage = () => {
  let result  = localStorage.getItem('users')
  return result?JSON.parse(result):[];
}

function App() {

  let [users, setUsers]=useState(
    getFromLocalStorage()
  )

  //משתנה של המיקום (מיקום ברירת מחדש זה המיקום שלי)
  let [location, setLocation]=useState({ lat: 32.06907930202371, lon: 34.91432399902553 });
  

  //פונקצייה להוספת משתמש חדש לאחר מילוי הטופס
  //מקבל את הערכים מפונקציית SAVE
  //מעדכן ID ומוסיף לרשימה בלוקלסטורג
  const addUser = (values) => {
    let newUser = {...values};
    newUser.id = users.length+1;
    let copy = [...users,newUser]
    setUsers(copy);
    localStorage.setItem('users', JSON.stringify(copy))
    // setLocation({lat: values.chooseAdress.lat, lon: values.chooseAdress.lon})
    // console.log(location)
    // console.log(copy)
 }

 //פטנקציה שמקבלת ערכים של מיקום הכתובת שנבחרה בטופס ומעדכנת את המשתנה
 const map = (lat, lon)=>{
  setLocation({lat:lat, lon:lon})
 }

 
  //שליחת משתנים/פונקציות לקומפוננטות
return<>
 <Form addUser={addUser} map={map}/>
 <Map lat={location.lat} lon={location.lon} />
 </>
}

export default App
