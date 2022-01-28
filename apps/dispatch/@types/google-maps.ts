export interface Coordinate {
	lat: number
	lng: number
}

export type PlacesAutocomplete = google.maps.places.Autocomplete
export type PlacesLibraries = (
	| 'places'
	| 'drawing'
	| 'geometry'
	| 'localContext'
	| 'visualization'
)[]
export type PlaceResult = google.maps.places.PlaceResult
export type GoogleMapType = google.maps.Map
export type MapOptions = google.maps.MapOptions
