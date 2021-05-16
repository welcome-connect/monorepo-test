import { auth, Users, Teams } from '@welcome-connect/firebase'
import { Team } from '@welcome-connect/firebase/@types'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/auth/AuthProvider'
import { Types } from '../contexts/auth/state'

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext)
	const router = useRouter()

	async function signin(email: string, password: string) {
		dispatch({ type: Types.FetchReq })
		try {
			await auth.signInWithEmailAndPassword(email, password)
			router.push('/dispatch')
		} catch (error) {
			console.error('Error signing in: ', error.message)
			dispatch({ type: Types.FetchFail, error: error.message })
		}
	}

	async function signout() {
		try {
			await auth.signOut()
			dispatch({ type: Types.SignOut })
			router.push('/')
		} catch (error) {
			console.error('Error signing out: ', error.message)
			dispatch({ type: Types.FetchFail, error: error.message })
		}
	}

	const handleUser = async (user: firebase.default.User | null) => {
		dispatch({ type: Types.FetchReq })
		if (!user) {
			dispatch({ type: Types.isNotLoggedIn })
			if (router.pathname.indexOf('/signup') > -1) {
				return
			} else {
				router.push('/')
				return
			}
		}

		const userDoc = await Users.findOne(user.uid)
		if (userDoc && userDoc.teams.length > 0) {
			const teamId = userDoc.teams[0]
			const userTeam = await Teams.findOne(teamId)

			if (user && userDoc && userTeam) {
				dispatch({ type: Types.SetUserDocs, userDoc, userAuth: user, userTeam })
			}
		}
	}

	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(handleUser)
		return () => unsubscribeFromAuth()
	}, [])

	return { ...state, signin, signout }
}
