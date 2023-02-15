import { React, useEffect, useState } from 'react'
import { getCountries, addCountry, updateTodo, deleteTodo } from '../API'
import markerIconSvg from '../img/square-icon.svg'
import { Icon, divIcon } from 'leaflet'
import '../App.css'
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import '../App.css'
import { map } from 'leaflet'

function Map() {
  const [xxx, setXXX] = useState<ICountry[]>([])
  const [color, setColor] = useState<string>('#ff0000')

  useEffect(() => {
    getCountries()
      .then(({ data: item }: ICountry[] | any) => setXXX(item))
      .catch((err: Error) => console.log(err))
  }, [])

  function ChangeView() {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng.lng)
        console.log(e.latlng.lat)
      },
    })
  }

  const customIcon = divIcon({
    className: '',
    iconSize: [32, 32],
    popupAnchor: [0, -20],
    html: `<div class="customIcon" style="color: ${color}"><i class="fas fa-square"></i></div>`,
  })

  return (
    <div className="map">
      <MapContainer
        center={[48, 20]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {xxx.map((country: ICountry) => (
          <Marker
            position={[
              country.latitude ? country.latitude : (country.latitude = 0),
              country.longitude ? country.longitude : (country.longitude = 0),
            ]}
            icon={customIcon}
          >
            <Popup>
              <h4>Welcome to {country.name}</h4>
              <input
                onChange={(e) => {
                  setColor(e.target.value)
                }}
                className="colorpicker"
                type="color"
                id="colorpicker"
                value={color}
              ></input>
            </Popup>
          </Marker>
        ))}
        <ChangeView />
      </MapContainer>
    </div>
  )
}

export default Map
