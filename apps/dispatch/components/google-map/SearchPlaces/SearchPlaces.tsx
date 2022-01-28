import styled from 'styled-components'
import { ChangeEvent, useCallback, useState } from 'react'
import { Autocomplete, LoadScript } from '@react-google-maps/api'
import {
	Coordinate,
	PlaceResult,
	PlacesAutocomplete,
	PlacesLibraries
} from '@app/types/google-maps'
import { FieldSet, Input, Label } from '@app/styles/components'

type SearchPlacesProps = {
	panTo?: (coords: Coordinate) => void
	setCoordinates?: (coords: Coordinate) => void
	setPlace?: (place: PlaceResult) => void
}

const libraries: PlacesLibraries = ['places']
const googleAPIKey = process.env.FIREBASE_API_KEY as string

export const SearchPlaces = ({ panTo, setCoordinates, setPlace }: SearchPlacesProps) => {
	const [autocomplete, setAutocomplete] = useState<PlacesAutocomplete | null>(null)
	const [query, setQuery] = useState('')

	const onPlacesLoad = useCallback((autocomplete: PlacesAutocomplete) => {
		setAutocomplete(autocomplete)
	}, [])

	const onPlaceChanged = () => {
		if (autocomplete) {
			const place = autocomplete.getPlace()
			const lat = place.geometry?.location?.lat()
			const lng = place.geometry?.location?.lng()
			if (lat && lng) {
				setQuery(place.formatted_address as string)
				setPlace && setPlace(place)
				setCoordinates && setCoordinates({ lat, lng })
				panTo && panTo({ lat, lng })
			}
		}
	}

	return (
		<LoadScript googleMapsApiKey={googleAPIKey} libraries={libraries}>
			<Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onPlacesLoad}>
				<MFieldSet>
					<MLabel htmlFor="location">City</MLabel>
					<MInput
						type="text"
						name="location"
						id="location"
						placeholder="🔍  Search for a city"
						value={query}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
					/>
				</MFieldSet>
			</Autocomplete>
		</LoadScript>
	)
}

const MInput = styled(Input)`
	background-color: ${({ theme }) => theme.colors.fg.primary};
	font-size: 14px;
`

const MLabel = styled(Label)`
	font-size: 14px;
`

const MFieldSet = styled(FieldSet)`
	margin-bottom: 1rem;
`
