import { SettingsLayout } from '@app/components/settings/SettingsLayout'
import CreateTeamForm from '@app/components/settings/TeamSettings/CreateTeamForm'
import { PageContainer } from '@app/styles/components'

export default function CreateTeamPage() {
	return (
		<SettingsLayout hasAction={false} title="Team Settings">
			<PageContainer>
				<CreateTeamForm />
			</PageContainer>
		</SettingsLayout>
	)
}
