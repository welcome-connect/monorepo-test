import { createContext, useReducer, ReactNode, Dispatch } from 'react'
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

	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
