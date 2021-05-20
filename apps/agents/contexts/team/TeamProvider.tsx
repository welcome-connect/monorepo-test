import { createContext, useReducer, ReactNode, Dispatch, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useTeam } from '../../hooks/useTeam'
import { initialState, teamReducer, TeamState, TeamActions, TeamActionTypes } from './state'

interface TeamContextValues {
	state: TeamState
	dispatch: Dispatch<TeamActions>
}

export const TeamContext = createContext<TeamContextValues>({
	state: initialState,
	dispatch: () => null
})

export function TeamProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(teamReducer, initialState)

	return (
		<TeamContext.Provider value={{ state, dispatch }}>
			{children}
		</TeamContext.Provider>
	)
}
