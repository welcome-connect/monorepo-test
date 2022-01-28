import { UserProfile, PartialUser } from '../@types/Users'
import { db } from '../db'
import firebase from 'firebase/app'
import { Team } from '../@types'

async function getDocumentById(id: string) {
	const userSnapshot = await db.users.doc(id).get()
	if (!userSnapshot.exists) return null
	return userSnapshot.data()
}

async function createDoc(userData: UserProfile, userAuth: firebase.User) {
	if (!userData || !userAuth) return

	const userRef = db.users.doc(userAuth.uid)
	const snapshot = await userRef.get()

	if (!snapshot.exists) {
		const createdAt = firebase.firestore.FieldValue.serverTimestamp()

		try {
			await userRef.set({
				id: userAuth.uid,
				createdAt,
				teams: {},
				roles: [],
				...userData
			})
			await userAuth.updateProfile({ displayName: userData.displayName })
		} catch (error) {
			console.error('Error creating new user: ', error.message)
		}
	}

	return getDocumentById(userAuth.uid)
}

async function getAgentsByTeamId({ id, name }: Team) {
	const agentsRef = db.users
		.where(`teams.${id}`, '==', name)
		.where('roles', 'array-contains', 'agent')

	const agents = (await agentsRef.get()).docs.map(doc => {
		return doc.data()
	})

	return agents
}

async function getDispatchersByTeamId({ id, name }: Team) {
	const agentsRef = db.users
		.where(`teams.${id}`, '==', name)
		.where('roles', 'array-contains', 'dispatcher')

	const agents = (await agentsRef.get()).docs.map(doc => {
		return doc.data()
	})

	return agents
}

async function updateDisplayName(userAuth: firebase.User, newDisplayName: string) {
	await userAuth.updateProfile({ displayName: newDisplayName })
	await updateDoc(userAuth.uid, { displayName: newDisplayName })

	const updatedUser = await getDocumentById(userAuth.uid)
	return updatedUser
}

async function updateEmail(userAuth: firebase.User, newEmail: string) {
	await userAuth.updateEmail(newEmail)
	await updateDoc(userAuth.uid, { email: newEmail })

	const updatedUser = await getDocumentById(userAuth.uid)
	return updatedUser
}

async function updatePhoneNumber(id: string, newPhoneNumber: string) {
	await updateDoc(id, { phoneNumber: newPhoneNumber })

	const updatedUser = await getDocumentById(id)
	return updatedUser
}

async function updateDoc(uid: string, updatedUser: PartialUser) {
	try {
		await db.users.doc(uid).update(updatedUser)
	} catch (error) {
		console.error('Error updating user', error.message)
	}

	return getDocumentById(uid)
}

export default {
	getDocumentById,
	createDoc,
	updateDoc,
	getAgentsByTeamId,
	getDispatchersByTeamId,
	updateDisplayName,
	updateEmail,
	updatePhoneNumber
}
