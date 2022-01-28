import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Team } from '@welcome-connect/firebase/@types'

type TeamCardProps = {
	team: Team
}

export function TeamCard({ team }: TeamCardProps) {
	const router = useRouter()

	return (
		<TeamCardContainer onClick={() => router.push(`/settings/teams/${team.id}`)}>
			<Title>{team.name}</Title>
			<CountContainer>
				<Count>{`Dispatchers: ${team.dispatcherCount}`}</Count>
				<Count>{`Agents: ${team.agentCount}`}</Count>
			</CountContainer>
		</TeamCardContainer>
	)
}

const TeamCardContainer = styled.div`
	background: white;
	border-radius: 4px;
	padding: 8px;
	margin-bottom: 8px;

	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.colors.fg.primary_hover};
	}
`

const Title = styled.strong`
	font-weight: 500;
`
const CountContainer = styled.div``
const Count = styled.span`
	margin-right: 16px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.text.secondary};
`
