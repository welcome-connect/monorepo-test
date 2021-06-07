import { Team } from '@welcome-connect/firebase/@types'

export enum TeamActionTypes {
	SetTeam = 'SET_TEAM'
}

export type TeamState = {
	team: Team | null | undefined
	initialRender: boolean
}

export const initialState = {
	team: null,
	initialRender: true
}

export type TeamActions = { type: 'SET_TEAM'; team: Team | null | undefined }

export const teamReducer = (state: TeamState, action: TeamActions) => {
	switch (action.type) {
		case TeamActionTypes.SetTeam:
			return { ...state, team: action.team, initialRender: false }
		default:
			return { ...state }
	}
}
