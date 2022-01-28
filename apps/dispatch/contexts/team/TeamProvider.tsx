import { createContext, useReducer, ReactNode, Dispatch } from 'react'
import { initialState, teamReducer, TeamState, TeamActions } from './state'

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

	return <TeamContext.Provider value={{ state, dispatch }}>{children}</TeamContext.Provider>
}
