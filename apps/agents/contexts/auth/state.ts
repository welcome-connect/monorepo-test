import { Team, User } from '@welcome-connect/firebase/@types'

export enum AuthActionTypes {
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
	isLoggedIn: boolean
	isLoading: boolean
	error: string | null
}

export const initialState: AuthState = {
	userAuth: null,
	userDoc: null,
	isLoggedIn: false,
	isLoading: false,
	error: null
}

export type AuthActions =
	| { type: 'FETCH_REQ' }
	| { type: 'FETCH_FAILED'; error: string }
	| { type: 'SIGN_IN_SUCCESS' }
	| { type: 'SIGNOUT_SUCCESS' }
	| {
			type: 'SET_USER_DOCS'
			userDoc: User | null
			userAuth: firebase.default.User | null
	  }
	| { type: 'IS_NOT_LOGGED_IN' }

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
	switch (action.type) {
		case AuthActionTypes.FetchReq:
			return { ...state, isLoading: true }
		case AuthActionTypes.FetchFail:
			return { ...state, isLoading: false, error: action.error }
		case AuthActionTypes.SignOut:
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				userAuth: null,
				userDoc: null,
			}
		case AuthActionTypes.SetUserDocs:
			return {
				...state,
				userDoc: action.userDoc,
				userAuth: action.userAuth,
			}
		case AuthActionTypes.isNotLoggedIn:
			return {
				...state,
				userAuth: null,
				userDoc: null,
				isLoading: false,
				error: null
			}
		default:
			return state
	}
}
