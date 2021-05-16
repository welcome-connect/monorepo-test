import { db } from '../db'

async function findOne(id: string) {
	const teamSnapshot = await db.teams.doc(id).get()
	if (!teamSnapshot.exists) throw new Error('User not found')

	return teamSnapshot.data()
}

export default { findOne }
