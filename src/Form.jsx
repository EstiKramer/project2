import { useState } from "react";
import {useForm} from "react-hook-form"
import App from "./App";
import Map from "./Map";
import "./Form.css";
import { latLng } from "leaflet";




export default function Form({addUser, map}){
    let [list, setList]=useState([]);
    let [query, setQuery]=useState()
    let [select, setSelect]=useState(null)
   
//מערך של סטטוס חיפוש
let statusArr=[{id:1,name:"searching"}, {id:2,name:"found"},{id:3,name:"cancelled"}];

//הגדרת פונקציות של טופס
let{register, handleSubmit,reset, formState:{isValid, errors, touchFields}, getValues}=useForm({
    mode:"all",
    defaultValues:{
       status:statusArr[0].name,
       id:0,
       chooseAsress:[]
    }
});

//פונקציה שמקבלת את הערך של החיפוש כתובת ושולפת את רשימת הכתובות המתאימות לחיפוש מהשרת
const search = async (query) => {
    let url =    `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`;
     if(!query)
        return
    try{
        let data = await fetch(url);
        let results = await data.json();
        
        if(!results||results==[])
            console.error("אין תוצאות מתאימות לכתובת שציינת");
        setList(results)
        console.log(results)
    }
    catch(err){
    console.log("error"+err)
    }
    }

//פונקציה שמקבלת את הכתובת שנבחרה ושולחת את הערכים של המיקום לפונקציה המאימה בAPP
//ומדפיסה הודעה למשתמש עם פרטי הכתךובת שבחר
const sendMap = (value) => {
    value=JSON.parse(value);
    let lat = value.lat;
    let lon = value.lon;
    map(lat, lon);
    setSelect(value);
    alert(value.display_name)
}
 
//לאחר מילוי פרטי הטופס כנדרש הפונקציה מעבירה את הנתונים לפונקציה המתאימה בAPP
//מדפיסה הודעה למשתמש ומאפסת את הטופס
const save=(values)=>{
    values.chooseAsress=select;
    addUser(values)
    alert("פרטיך נשמרו בהצלחה")
    reset();
}


 

    return (<>
        {<h1>טופס פרטי  מחפש קולגה</h1>}
    <form className="form" noValidate onSubmit={handleSubmit(save)}>
        {/* {isValid?<p>תקין</p>:<p>לא תקין</p>} */}
        
        
        <div id="part1">
            <h4>מלא את הפרטים הבאים</h4>
            <div id="name">
                {/* {שדה של השם} */}
                <input {...register("userName",{required:true})} placeholder="שם" type="text"/>
                {errors.userName&&<div id="1">שדה חובה</div>}
            </div>

            <div id="adress">
                <div id="sb">
                     {/* {שדה של חיפוש} */}
                <input  placeholder="חיפוש כתובת" type="text"
                onChange={(e)=>{setQuery(e.target.value), search(e.target.value)}}/>
                {errors.adress&&<div id="1">שדה חובה</div>}
            
                {/* <button  type="button" onClick={()=>search(query)}>חיפוש</button> */}
                </div>

            
        <div>

             {/* {טבלת הכתובות המתאימות לחיפוש (מוצגת רק  אם קיים ערך בשדה חיפוש)} */}

        {!select&&
        (<div id="chooseAdress">
        {/* <select id="select1"  {...register("chooseAdress",{ required:"יש לבחור ערך"})} onChange={(e)=>sendMap(e.target.value)}>
        {/* <option value="">בחר כתובת</option> */}
            {/* {list.map(item => (<option key={item.place_id}  value={JSON.stringify(item)} > */}
             {/* {item.display_name} */}
        {/* </option>))} */}
        {/* </select> */} 
        {/* } */}
       {/* { console.log(list)} */}
        {list.map(item =><div id="item" key={item.place_id}  value={JSON.stringify(item)} 
        onClick={()=>sendMap(JSON.stringify(item), setSelect(JSON.stringify(item)))}>{item.display_name}</div>)}
        </div>)}
        </div>
        </div>
            
        
 {/* {שדה של מספר טלפון} */}
    <div id="phone">
        <input {...register("phone", {required:"שדה חובה",
            validate:(value)=>
                value.length===10||"המספר אינו תקין",
            })} placeholder="מספר טלפון" type="text"/>
        {errors.phone&&<div id="1">{errors.phone.message}</div>}
    </div>

     {/* {שדה של כתובת מייל} */}
    <div id="email">
        <input {...register("email",{required:"שדה חובה",pattern:{value:/^[A-Za-z0-9]{3,10}@[A-Za-z0-9]+\.[A-Za-z]{2,}$/, message:"מייל לא תקין"}
        })} placeholder="מייל" type="email"/>
        {errors.email&&<div id="1">{errors.email.message}</div>}
        </div>
        </div>

        <div id="part2">
            <h4>מה תרצה שיהיה לך במשרד?</h4>
        <div id="internet">
             {/* {שדה בחירה לחיבור לאינטרנט} */}
            <label>
        <input type="checkbox" id="select2" placeholder="חיבור לאינטרנט" {...register("internetConection",{ required:false})}/>
        חיבור לאינטרנט</label>
        </div>

         {/* {שדה בחירה למטבח} */}
        <div id="kitchen">
        <label>
        <input type="checkbox" id="select2" placeholder="מטבח" {...register("kitchen",{ required:false})}/>מטבח</label>
        </div>

         {/* {שדה בחירה למכונת קפה} */}
        <div id="coffee">
        <label>
        <input type="checkbox" id="select2" placeholder="מכונת קפה" {...register("coffeeMachine",{ required:false})}/>מכונת קפה </label>
        </div>

         {/* {שדה מספר חדרים} */}
        <div id="numRoom">
        <input {...register("numRooms", {required:true})} placeholder="מספר חדרים" type="number"/>
        {errors.numRooms&&<div id="1">שדה חובה</div>}
        </div>

         {/* {שדה למרחק} */}
        <div id="distance">
        <input {...register("distace",{required:true, validate:(number)=>{number<=10||"ניתן לבחור מרחק של עד 10 ק'מ"}})} placeholder="מרחק" type="number"/>
        </div>

         {/* {כפתור שליחת טופס} */}
        <div id="submit">
        <input type="submit" disabled={!isValid}/>
        </div>
        </div>
    </form>
    </>

     );
    }

 
