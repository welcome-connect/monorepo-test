import { GeoPoint, Timestamp } from '@firebase/firestore-types'

export type PartialTeam = {
	id: string
	name: string
}

export type Team = {
	id: string
	name: string
	agent_count: number
	dispatcher_count: number
	coords: GeoPoint
	created_at: Timestamp
}
