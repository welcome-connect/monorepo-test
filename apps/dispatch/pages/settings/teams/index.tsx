import { useRouter } from 'next/router'
import { SettingsLayout } from '@app/components/settings/SettingsLayout'
import { TeamSettings } from '@app/components/settings/TeamSettings'
import { PageContainer } from '@app/styles/components'

export default function TeamsSettingsPage() {
	const router = useRouter()
	const teamAction = {
		name: 'Create team',
		callback: () => router.push('/settings/teams/create')
	}

	return (
		<SettingsLayout hasAction title="Team Settings" action={teamAction}>
			<PageContainer>
				<TeamSettings />
			</PageContainer>
		</SettingsLayout>
	)
}
