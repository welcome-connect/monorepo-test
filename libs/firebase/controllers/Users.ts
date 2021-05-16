import { db } from '../db'

async function findOne(id: string) {
	const userSnapshot = await db.users.doc(id).get()
	if (!userSnapshot.exists) throw new Error('User not found')

	return userSnapshot.data()
}

export default { findOne }
