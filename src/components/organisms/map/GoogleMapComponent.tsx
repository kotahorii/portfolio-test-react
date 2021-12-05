import { memo, VFC } from 'react'
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Circle,
} from '@react-google-maps/api'
import { useGoogleMapComponent } from 'hooks/useGoogleMapComponent'
import { Post } from 'types/postType'

type Props = {
  post: Post | undefined
}

export const GoogleMapComponent: VFC<Props> = memo(({ post }) => {
  const { containerStyle, center, position, options, circleOptions } =
    useGoogleMapComponent()
  return (
    <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAP_API}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        options={options}
      >
        <InfoWindow position={position}>
          <div className="bg-white text-lg">
            <h1>{post?.title}</h1>
          </div>
        </InfoWindow>
        <Circle center={center} radius={50} options={circleOptions} />
      </GoogleMap>
    </LoadScript>
  )
})
