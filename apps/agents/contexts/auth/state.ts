import { Team, User } from '@welcome-connect/firebase/@types'

export enum Types {
	FetchReq = 'FETCH_REQ',
	FetchFail = 'FETCH_FAILED',
	SignIn = 'SIGN_IN_SUCCESS',
	SignOut = 'SIGNOUT_SUCCESS',
	SetUserDocs = 'SET_USER_DOCS',
	isNotLoggedIn = 'IS_NOT_LOGGED_IN'
}

export type AuthState = {
	userAuth: firebase.default.User | null
	userDoc: User | null
	userTeam: Team | null
	isLoggedIn: boolean
	isLoading: boolean
	error: string | null
}

export const initialState: AuthState = {
	userAuth: null,
	userDoc: null,
	userTeam: null,
	isLoggedIn: false,
	isLoading: false,
	error: null
}

export type AuthActions =
	| { type: 'FETCH_REQ' }
	| { type: 'FETCH_FAILED'; error: string }
	| { type: 'SIGNOUT_SUCCESS' }
	| {
			type: 'SET_USER_DOCS'
			userDoc: User | null
			userAuth: firebase.default.User | null
			userTeam: Team | null
	  }
	| { type: 'IS_NOT_LOGGED_IN' }

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
	switch (action.type) {
		case Types.FetchReq:
			return { ...state, isLoading: true }
		case Types.FetchFail:
			return { ...state, isLoading: false, error: action.error }
		case Types.SignOut:
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				userAuth: null,
				userDoc: null,
				userTeam: null
			}
		case Types.SetUserDocs:
			return {
				...state,
				userDoc: action.userDoc,
				userAuth: action.userAuth,
				userTeam: action.userTeam
			}
		case Types.isNotLoggedIn:
			return {
				...state,
				userAuth: null,
				userDoc: null,
				userTeam: null,
				isLoading: false,
				error: null
			}
		default:
			return state
	}
}
