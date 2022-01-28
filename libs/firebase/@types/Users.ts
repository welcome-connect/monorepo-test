import firebase from 'firebase/app'
import { TeamMap } from './Teams'

export type User = {
	id: string
	displayName: string
	email: string
	teams: TeamMap
	phoneNumber: string
	roles: string[]
	createdAt: firebase.firestore.FieldValue
}

export type PartialUser = {
	[Key in keyof User]?: User[Key]
}

export type UserProfile = {
	displayName: string
	phoneNumber: string
	email: string
}
