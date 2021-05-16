import { Team, User } from './@types'
import { dataPoint } from './utils/dataPoint'

export const db = {
	users: dataPoint<User>('users'),
	teams: dataPoint<Team>('teams')
}
