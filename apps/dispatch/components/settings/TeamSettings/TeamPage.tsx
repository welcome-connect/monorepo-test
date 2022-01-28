import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Team, User } from '@welcome-connect/firebase/@types'
import { Users } from '@welcome-connect/firebase'
import { UserCard } from '@app/components/users/UserCard/UserCard'
import { SimpleMap } from '@app/components/google-map/SimpleMap'

type TeamPageProps = {
	team: Team
}

export function TeamPage({ team }: TeamPageProps) {
	const [teamAgents, setTeamAgents] = useState<User[]>([])
	const [teamDispatchers, setTeamDispatchers] = useState<User[]>([])

	useEffect(function getTeamMembersOnPageLoad() {
		Users.getAgentsByTeamId(team).then(setTeamAgents)
		Users.getDispatchersByTeamId(team).then(setTeamDispatchers)
	}, [])

	console.log({ teamAgents, teamDispatchers, team })

	return (
		<PageContainer>
			<AgentSection>
				<h4>Agents</h4>
				{teamAgents
					? teamAgents.map(agent => <UserCard user={agent} key={agent.id} />)
					: null}
			</AgentSection>
			<DispatcherSection>
				<h4>Dispatchers</h4>
				{teamDispatchers
					? teamDispatchers.map(dispatcher => (
							<UserCard user={dispatcher} key={dispatcher.id} />
					  ))
					: null}
			</DispatcherSection>
			<MapContainer>
				<h4>Location</h4>
				<SimpleMap center={{ lat: team.coords.latitude, lng: team.coords.longitude }} />
			</MapContainer>
			<AddSection>
				<h4>Invite team members</h4>
			</AddSection>
		</PageContainer>
	)
}

const PageContainer = styled.div`
	padding: 1rem;
	display: grid;
	grid-template-rows: repeat(6, minmax(0, 1fr));
	grid-template-columns: 2fr 1fr;
	grid-template-areas:
		'agents map'
		'agents map'
		'agents add'
		'dispatchers add'
		'dispatchers add'
		'dispatchers add';
		grid-gap: 1rem;
	height: 100%;
	h4 {
		margin-bottom: 0.5rem;
	}
`

const AgentSection = styled.section`
	grid-area: agents;
`
const DispatcherSection = styled.section`
	grid-area: dispatchers;
`
const MapContainer = styled.div`
	grid-area: map;
	display: flex;
	flex-direction: column;
`
const AddSection = styled.div`
	grid-area: add;
`
