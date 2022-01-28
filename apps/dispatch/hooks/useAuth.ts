import { auth, firebase, Users } from '@welcome-connect/firebase'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { UserSignupData } from '@app/types/forms'
import { AuthContext } from '@app/contexts/auth/AuthProvider'
import { AuthActionTypes } from '@app/contexts/auth/state'

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext)
	const router = useRouter()

	const signin = useCallback(async (email: string, password: string) => {
		dispatch({ type: AuthActionTypes.FetchReq })
		try {
			const { user: userAuth } = await auth.signInWithEmailAndPassword(email, password)
			if (userAuth) {
				const user = await Users.getDocumentById(userAuth.uid)
				if (user && Object.entries(user.teams).length > 0) {
					router.push(
						`/dispatch/${Object.values(user.teams)[0]
							.replaceAll(' ', '-')
							.toLowerCase()}`
					)
				} else {
					router.push(`/dispatch`)
				}
			}
		} catch (error) {
			console.error('Error signing in: ', error.message)
			dispatch({ type: AuthActionTypes.FetchFail, error: error.message })
		}
	}, [])

	const signout = useCallback(async () => {
		try {
			await auth.signOut()
			router.push('/')
			dispatch({ type: AuthActionTypes.SignOut })
		} catch (error) {
			console.error('Error signing out: ', error.message)
			dispatch({ type: AuthActionTypes.FetchFail, error: error.message })
		}
	}, [])

	const signup = useCallback(
		async ({ email, password, displayName, phoneNumber }: UserSignupData) => {
			dispatch({ type: AuthActionTypes.FetchReq })

			try {
				const { user: userAuth } = await auth.createUserWithEmailAndPassword(
					email,
					password
				)
				if (userAuth) {
					const userData = { email, displayName, phoneNumber }
					await Users.createDoc(userData, userAuth)
					router.push('/dispatch')
				}
			} catch (error) {
				console.error('Error signing up: ', error.message)
				dispatch({ type: AuthActionTypes.FetchFail, error: error.message })
			}
		},
		[]
	)

	const setUserDoc = useCallback(userDoc => {
		dispatch({ type: AuthActionTypes.SetUserDoc, userDoc })
	}, [])

	const handleUser = useCallback(async (userAuth: firebase.User | null) => {
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

		const userDoc = await Users.getDocumentById(userAuth.uid)
		if (userDoc) {
			if (Object.entries(userDoc.teams).length > 0) {
				dispatch({ type: AuthActionTypes.SetUser, userDoc, userAuth })
			} else {
				dispatch({ type: AuthActionTypes.SetUser, userDoc, userAuth })
			}
		}
	}, [])

	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(handleUser)
		return () => unsubscribeFromAuth()
	}, [])

	const memoizedState = useMemo(() => {
		return { ...state }
	}, [state])

	return { ...memoizedState, signin, signout, signup, setUserDoc }
}
