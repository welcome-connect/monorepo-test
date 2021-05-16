export type User = {
	id: string
	displayName: string
	teams: string[]
	phoneNumber: string
	role: string
	createdAt: {
		seconds: number
		nanoseconds: number
	}
}
