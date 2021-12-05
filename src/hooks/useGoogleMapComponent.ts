export const useGoogleMapComponent = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  }

  const center = {
    lat: 35.69575,
    lng: 139.77521,
  }
  const position = {
    lat: 35.69575,
    lng: 139.77521,
  }
  const options = {
    disableDefaultUI: false,
    zoomControl: true,
  }
  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3000,
    zIndex: 1,
  }
  return { containerStyle, center, position, options, circleOptions }
}
