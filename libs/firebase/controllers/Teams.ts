import { db } from '../db'

async function findOne(id: string) {
	const teamSnapshot = await db.teams.doc(id).get()
	if (!teamSnapshot.exists) return null

	return teamSnapshot.data()
}

export default { findOne }
