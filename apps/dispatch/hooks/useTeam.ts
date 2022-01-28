import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Teams } from '@welcome-connect/firebase'
import { useAuth } from '@app/hooks/useAuth'
import { TeamActionTypes } from '@app/contexts/team/state'
import { TeamContext } from '@app/contexts/team/TeamProvider'

export function useTeam() {
	const { state, dispatch } = useContext(TeamContext)
	const router = useRouter()
	const { userDoc } = useAuth()

	useEffect(() => {
		if (userDoc && state.initialRender) {
			const team = Object.entries(userDoc.teams).find(
				([_, teamName]) =>
					teamName.replaceAll(' ', '-').toLowerCase() === router.query.teamName
			)
			if (team) setTeam(team[0])
		}

		if (
			userDoc &&
			Object.values(userDoc.teams).length > 0 &&
			!router.query.teamName &&
			!state.team
		) {
			const teamId = Object.keys(userDoc.teams)[0]
			setTeam(teamId)
		}
	}, [userDoc, state.initialRender])

	const setTeam = async (teamId: string | null) => {
		if (!teamId) {
			dispatch({ type: TeamActionTypes.SetTeam, team: null })
		} else {
			const team = await Teams.getDocumentById(teamId)
			dispatch({ type: TeamActionTypes.SetTeam, team })
		}
	}

	return { ...state, setTeam }
}
