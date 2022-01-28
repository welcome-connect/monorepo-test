import { GeoPoint, FieldValue } from '@firebase/firestore-types'

export type TeamMap = { [id: string]: string }
export type Coordinate = { lat: number; lng: number }

export type Team = {
	id: string
	name: string
	agentCount: number
	dispatcherCount: number
	coords: GeoPoint
	createdAt: FieldValue
}

export type TeamCreateData = {
	name: string
	coords: Coordinate
}
