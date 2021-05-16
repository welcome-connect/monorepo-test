import { createContext, useReducer, ReactNode, Dispatch, useMemo } from 'react'
import { initialState, authReducer, AuthState, AuthActions } from './state'

interface AuthContextValues {
	state: AuthState
	dispatch: Dispatch<AuthActions>
}

export const AuthContext = createContext<AuthContextValues>({
	state: initialState,
	dispatch: () => null
})

export function AuthProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(authReducer, initialState)

	const memoizedState = useMemo(() => {
		return {
			...state
		}
	}, [state])

	return (
		<AuthContext.Provider value={{ state: memoizedState, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
