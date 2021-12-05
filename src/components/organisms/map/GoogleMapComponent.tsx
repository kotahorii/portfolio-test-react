import { memo } from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api'

const containerStyle = {
  width: 'full',
  height: '400px',
}

const center = {
  lat: 35.69575,
  lng: 139.77521
}

export const GoogleMapComponent = memo(() => {
  return <LoadScript googleMapsApiKey=''>
    <GoogleMap></GoogleMap>
  </LoadScript>
})
