import firebase from 'firebase/app'
import { db } from '../db'
import { Team, TeamCreateData } from '../@types/Teams'

async function getDocumentById(id: string) {
	const teamSnapshot = await db.teams.doc(id).get()
	return teamSnapshot.data()
}

async function getAll() {
	const teamsSnapshot = await db.teams.get()
	return teamsSnapshot.docs.map(doc => doc.data())
}

async function createDoc(teamData: TeamCreateData): Promise<Team | Error> {
	if (!teamData) throw new Error('Team data is required')

	const teamRef = db.teams.doc()
	const createdAt = firebase.firestore.FieldValue.serverTimestamp()
	const coords = new firebase.firestore.GeoPoint(teamData.coords.lat, teamData.coords.lng)

	try {
		await teamRef.set({
			id: teamRef.id,
			createdAt,
			name: teamData.name,
			coords,
			agentCount: 0,
			dispatcherCount: 0
		})

		const newTeam = await getDocumentById(teamRef.id)
		if (newTeam) return newTeam
		else throw new Error('Error creating new team')
	} catch (error) {
		return error
	}
}

export default { getDocumentById, getAll, createDoc }
