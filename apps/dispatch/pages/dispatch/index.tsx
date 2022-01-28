import styled from 'styled-components'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

import { useTeam } from '@app/hooks/useTeam'

import { Layout, SideNav, TopNav } from '@app/components/common'
import { PageContainer } from '@app/styles/components'

export default function DispatchHomePage() {
	const router = useRouter()
	const { team } = useTeam()

	useEffect(
		function routeToTeamPage() {
			if (team) router.push(`/dispatch/${team.name.replaceAll(' ', '-').toLowerCase()}`)
		},
		[team]
	)

	return (
		<Layout hasSubSideBar={false}>
			<TopNav>
				<p>Dispatch</p>
			</TopNav>
			<SideNav></SideNav>
			<MPageCotainer>
				<h2>You are not part of a team! </h2>
			</MPageCotainer>
		</Layout>
	)
}

const MPageCotainer = styled(PageContainer)`
	display: grid;
	place-items: center;
`
