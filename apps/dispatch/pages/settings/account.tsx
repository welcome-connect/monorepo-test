import { useForm } from 'react-hook-form'
import { UserProfile } from '@welcome-connect/firebase/@types'

import { useUpdateUserProfile } from '@app/hooks/useUpdateUserProfile'
import { AccountSettings } from '@app/components/settings/AccountSettings'
import { SettingsLayout } from '@app/components/settings/SettingsLayout'
import { PageContainer } from '@app/styles/components'
import { formatPhoneNumber } from '@app/utils/formatPhoneNumber'

export default function AccountSettingsPage() {
	const formController = useForm()
	const { updateUserProfile } = useUpdateUserProfile()

	function saveUserChanges(data: UserProfile) {
		updateUserProfile({ ...data, phoneNumber: formatPhoneNumber(data.phoneNumber) })
	}

	const accountAction = {
		name: 'Save changes',
		callback: formController.handleSubmit(saveUserChanges)
	}

	return (
		<SettingsLayout hasAction title="Account Settings" action={accountAction}>
			<PageContainer>
				<AccountSettings formController={formController} />
			</PageContainer>
		</SettingsLayout>
	)
}
