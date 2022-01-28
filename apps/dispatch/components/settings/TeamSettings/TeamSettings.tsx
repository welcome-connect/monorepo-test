import styled from 'styled-components'
import { useEffect, useState } from 'react'

import { Teams } from '@welcome-connect/firebase'
import { Team } from '@welcome-connect/firebase/@types'

import { TeamCard } from './TeamCard'
import { Button } from '@app/styles/components'

export function TeamSettings() {
	const [teams, setTeams] = useState<Team[]>([])

	async function fetchTeams() {
		const teams = await Teams.getAll()
		setTeams(teams)
	}

	useEffect(() => {
		fetchTeams()
	}, [])

	return (
		<PageContainer>
			<h4>Teams</h4>
			<div>
				{teams.map(team => {
					return <TeamCard key={team.id} team={team} />
				})}
			</div>
		</PageContainer>
	)
}

const PageContainer = styled.div`
	padding: 1rem;
	h4 {
		margin-bottom: 0.5rem;
	}
`

const MButton = styled(Button)`
	width: fit-content;
	font-size: 14px;
	font-weight: 500;
	padding: 8px 12px;
	border-radius: 4px;
	border-width: 2px;
	background: ${({ theme }) => theme.colors.secondary.primary};

	&:hover {
		background: ${({ theme }) => theme.colors.secondary.hover};
	}
`
