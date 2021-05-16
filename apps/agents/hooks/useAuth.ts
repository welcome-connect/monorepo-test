import { auth, Users, Teams } from '@welcome-connect/firebase'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect } from 'react'
import { UserSignupData } from '../@types/forms'
import { AuthContext } from '../contexts/auth/AuthProvider'
import { AuthActionTypes } from '../contexts/auth/state'

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext)
	const router = useRouter()

	async function signin(email: string, password: string) {
		dispatch({ type: AuthActionTypes.FetchReq })
		try {
			await auth.signInWithEmailAndPassword(email, password)
			router.push('/dispatch')
		} catch (error) {
			console.error('Error signing in: ', error.message)
			dispatch({ type: AuthActionTypes.FetchFail, error: error.message })
		}
	}

	async function signout() {
		try {
			await auth.signOut()
			dispatch({ type: AuthActionTypes.SignOut })
			router.push('/')
		} catch (error) {
			console.error('Error signing out: ', error.message)
			dispatch({ type: AuthActionTypes.FetchFail, error: error.message })
		}
	}

	async function signup({ email, password, display_name, phone_number }: UserSignupData) {
		dispatch({ type: AuthActionTypes.FetchReq })

		try {
			const { user: userAuth } = await auth.createUserWithEmailAndPassword(email, password)
			if (userAuth) {
				const userData = { email, display_name, phone_number }
				await Users.createDoc(userData, userAuth)
				router.push('/dispatch')
			}
		} catch (error) {
			console.error('Error signing up: ', error.message)
			dispatch({ type: AuthActionTypes.FetchFail, error: error.message })
		}
	}

	const handleUser = async (userAuth: firebase.default.User | null) => {
		dispatch({ type: AuthActionTypes.FetchReq })
		if (!userAuth) {
			dispatch({ type: AuthActionTypes.isNotLoggedIn })
			if (router.pathname.indexOf('/signup') > -1) {
				return
			} else {
				router.push('/')
				return
			}
		}

		const userDoc = await Users.findOne(userAuth.uid)
		if (userDoc) {
			if (userDoc.teams.length > 0) {
				const teamId = userDoc.teams[0]
				const userTeam = await Teams.findOne(teamId)
				dispatch({ type: AuthActionTypes.SetUserDocs, userDoc, userAuth, userTeam })
			} else {
				dispatch({ type: AuthActionTypes.SetUserDocs, userDoc, userAuth, userTeam: null })
			}
		}
	}

	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(handleUser)
		return () => unsubscribeFromAuth()
	}, [])

	return { ...state, signin, signout, signup }
}
