import { Teams } from '@welcome-connect/firebase'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect } from 'react'
import { TeamActionTypes } from '../contexts/team/state'
import { TeamContext } from '../contexts/team/TeamProvider'
import { useAuth } from './useAuth'

export function useTeam() {
	const { state, dispatch } = useContext(TeamContext)
	const router = useRouter()
	const { userDoc } = useAuth()

	useEffect(() => {
		if (userDoc && state.initialRender) {
			const team = userDoc.teams.find(
				team => team.name.replaceAll(' ', '-').toLowerCase() === router.query.teamName
			)
			if (team) setTeam(team.id)
		}
	}, [userDoc, state.initialRender])

	const setTeam = async (teamId: string) => {
		const team = await Teams.findOne(teamId)
		dispatch({ type: TeamActionTypes.SetTeam, team })
	}

	return { ...state, setTeam }
}
