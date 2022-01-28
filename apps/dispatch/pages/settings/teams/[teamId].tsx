import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Team } from '@welcome-connect/firebase/@types'
import { Teams } from '@welcome-connect/firebase'
import { SettingsLayout } from '@app/components/settings/SettingsLayout'
import { PageContainer } from '@app/styles/components'
import { TeamPage } from '@app/components/settings/TeamSettings'

export default function TeamContainerPage() {
	const [team, setTeam] = useState<Team>()
	const router = useRouter()

	useEffect(
		function getTeamOnPageLoad() {
			Teams.getDocumentById(router.query.teamId as string).then(setTeam)
		},
		[router]
	)

	console.log({ team })

	return (
		<SettingsLayout hasAction={false} title={team?.name ? `${team?.name} Team` : 'loading...'}>
			{team ? <TeamPage team={team} /> : null}
		</SettingsLayout>
	)
}
