import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import "./Map.css";

//הקומפוננטה מקבלת ערכים של המיקום ומעדכנת את התצגודה של המפה
const Map = ({lat, lon}) => {
    const [position, setPosition] =useState( [lat, lon])

    //הפונקציה מקבלת את הערכים של המיקום ומעדכנת אותם כשהם משתנים/ נשלים ערכים חדשים
    const Update =({lat, lon})=>{
        const map = useMap();
        useEffect(()=>{
            map.flyTo([lat, lon]), map.getZoom();
        },[lat, lon, map]);
        return null;
    }

    // useEffect(()=>{
    //     setPosition([lat,lon])
    // },[lat,lon]);
   

    //התצוגה של המפה והמיקום
    return (
        <MapContainer className='map' center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Update lat={lat} lon={lon} />
        <Marker position={[lat, lon]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
   
}
 
export default Map;

