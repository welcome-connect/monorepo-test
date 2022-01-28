import styled from 'styled-components'
import { useCallback, useRef } from 'react'
import { useLoadScript, GoogleMap } from '@react-google-maps/api'

import mapStyles from './mapStyles'
import { Coordinate, GoogleMapType, PlacesLibraries } from '@app/types/google-maps'

const libraries: PlacesLibraries = ['places']
const googleMapsApiKey = process.env.FIREBASE_API_KEY as string
const mapContainerStyle = {
	width: '100%',
	height: '100%'
}
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: false
}

type SimpleMapProps = {
	center: Coordinate
}

export const SimpleMap = ({ center }: SimpleMapProps) => {
	const mapRef = useRef<GoogleMapType>()
	const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey, libraries })

	const onMapLoad = useCallback(map => {
		mapRef.current = map
	}, [])

	if (loadError) return <p>Error loading maps</p>
	if (!isLoaded) return <p>Loading Maps</p>

	return (
		<Container>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
				onLoad={onMapLoad}
			/>
		</Container>
	)
}

const Container = styled.div`
	flex-grow: 1;
	border-radius: 8px;
	overflow: hidden;

	iframe + div {
		display: none;
	}

	.gm-style {
		outline: none !important;
	}

	.gm-style-iw {
		border-radius: 16px;
		box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04);

		button {
			display: none !important;
		}
	}

	.gm-style-iw {
		border-radius: 16px;
		box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04);
	}

	.gm-ui-hover-effect {
		top: 4px !important;
		right: 4px !important;
	}

	.gmnoprint {
		display: none;
	}

	a[rel='noopener'] {
		display: none !important;
	}
`
