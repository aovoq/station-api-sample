import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
   const [tmp, setTmp] = useState([])
   const [geo, setGeo] = useState({ x: 0, y: 0 })

   const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const res = await fetch(`https://station.aovoq.work/v1/station?name=${event.target.value}`)
      const json = await res.json()
      if (json.status != 'error') {
         setTmp(json)
         console.log(json)
      }
   }

   const handleClick = (lat: number, log: number) => {
      console.log(lat, log)
      setGeo({ x: lat, y: log })
   }

   return (
      <div>
         <input type='text' onChange={handleChange} />
         {tmp.length !== 0 && (
            <ul>
               {tmp.map((station: any) => (
                  <li onClick={() => handleClick(station.lat, station.log)} style={{ cursor: 'pointer' }}>
                     {station.name}
                  </li>
               ))}
            </ul>
         )}
         <div>
            {geo.x != 0 && (
               <iframe
                  src={`https://maps.google.co.jp/maps?output=embed&q=${geo.x}, ${geo.y}`}
                  width='800'
                  height='450'
                  style={{ border: 0 }}
                  loading='lazy'
               ></iframe>
            )}
         </div>
      </div>
   )
}

export default App
