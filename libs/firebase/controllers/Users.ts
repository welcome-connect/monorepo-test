import { UserCreateData } from '../@types/Users'
import { db } from '../db'
import firebase from 'firebase'

async function findOne(id: string) {
	const userSnapshot = await db.users.doc(id).get()
	if (!userSnapshot.exists) return null
	return userSnapshot.data()
}

async function createDoc(userData: UserCreateData, userAuth: firebase.User) {
	if (!userData || !userAuth) return

	const userRef = db.users.doc(userAuth.uid)
	const snapshot = await userRef.get()

	if (!snapshot.exists) {
		const created_at = firebase.firestore.FieldValue.serverTimestamp()

		try {
			await userRef.set({
				id: userAuth.uid,
				created_at,
				teams: {},
				roles: [],
				...userData
			})
			await userAuth.updateProfile({ displayName: userData.display_name })
		} catch (error) {
			console.error('Error creating new user: ', error.message)
		}
	}

	return findOne(userAuth.uid)
}

async function getAgentsByTeam(id: string, name: string) {
	const agentsRef = db.users
		.where(`teams.${id}`, '==', name)
		.where('roles', 'array-contains', 'agent')

	const agents = (await agentsRef.get()).docs.map(doc => {
		return doc.data()
	})

	return agents
}

export default { findOne, createDoc, getAgentsByTeam }
