import firebase from 'firebase'

export type User = {
	id: string
	display_name: string
	teams: string[]
	phone_number: string
	roles: string[]
	created_at: firebase.firestore.FieldValue
}

export type UserCreateData = {
	display_name: string
	phone_number: string
	email: string
}
