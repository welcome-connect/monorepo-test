export type UserSignupData = {
	displayName: string
	email: string
	phoneNumber: string
	password: string
}

export type TeamCreateData = {
	name: string
	coords: { lat: number; lng: number }
}
