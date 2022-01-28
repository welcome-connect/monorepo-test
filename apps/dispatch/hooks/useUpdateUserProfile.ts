import { toast } from 'react-toastify'

import { Users } from '@welcome-connect/firebase'
import { PartialUser } from '@welcome-connect/firebase/@types'

import { useAuth } from './useAuth'

export const useUpdateUserProfile = () => {
	const { userAuth, userDoc, setUserDoc } = useAuth()

	const updateUserProfile = async ({ displayName, email, phoneNumber }: PartialUser) => {
		let updatedUser
		if (userAuth && userDoc) {
			if (
				displayName === userAuth.displayName &&
				email === userAuth.email &&
				phoneNumber === userDoc.phoneNumber
			) {
				toast.warn('No changes made')
				return
			}

			try {
				if (typeof displayName === 'string' && displayName !== userAuth.displayName) {
					updatedUser = await Users.updateDisplayName(userAuth, displayName)
				}

				if (typeof email === 'string' && email !== userAuth.email) {
					updatedUser = await Users.updateEmail(userAuth, email)
				}

				if (typeof phoneNumber === 'string' && phoneNumber !== userDoc.phoneNumber) {
					updatedUser = await Users.updatePhoneNumber(userDoc.id, phoneNumber)
				}

				setUserDoc(updatedUser)
				toast.success('Changes saved successfully')
			} catch (error) {
				if (error.code === 'auth/requires-recent-login') {
					toast.error('Sensitive changes! Please logout and log back in.')
					console.error(error)
				}
				console.error(error)
			}
		}
	}

	return { updateUserProfile }
}
