import { createContext, useReducer, ReactNode, Dispatch } from 'react'
import { initialState, navigationReducer, NavigationState, NavigationActions } from './state'

interface NavContextValues {
	state: NavigationState
	dispatch: Dispatch<NavigationActions>
}

export const NavigationContext = createContext<NavContextValues>({
	state: initialState,
	dispatch: () => null
})

export function NavigationProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(navigationReducer, initialState)

	return (
		<NavigationContext.Provider value={{ state, dispatch }}>
			{children}
		</NavigationContext.Provider>
	)
}
