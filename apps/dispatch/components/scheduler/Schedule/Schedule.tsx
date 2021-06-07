import { db, Users } from '@welcome-connect/firebase'
import { User } from '@welcome-connect/firebase/@types'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useFirebaseSub } from '../../../hooks/useFirestoreSub'
import { useTeam } from '../../../hooks/useTeam'
import { getColumnSpan } from '../../../utils/getColumnSpan'
import { ShowingsRow } from '../ShowingsRow'

const TIMES = [
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30'
]

export function Schedule() {
	const [agents, setAgents] = useState<User[] | null | undefined>([])
	const { team } = useTeam()

	useEffect(() => {
		if (team) fetchAgentsByTeam(team.id, team.name)
	}, [team])

	async function fetchAgentsByTeam(id: string, name: string) {
		const fetchedAgents = await Users.getAgentsByTeam(id, name)
		setAgents(fetchedAgents)
	}

	return (
		<ScheduleContainer>
			<LeftContainer>
				<Grid>
					<Agents>
						<div className="agent-container">
							<div className="agent-row"></div>
						</div>
						{agents?.map(agent => {
							return (
								<div className="agent-container" key={agent.id}>
									<div className="avatar" />
									<div className="agent-row">{agent.display_name}</div>
								</div>
							)
						})}
					</Agents>
					<ShowingsGrid>
						<TimeLine>
							{TIMES.map(time => {
								return (
									<TimeContainer startTime={time} key={time}>
										<TimeSlot>
											<div className="time">{time}</div>
										</TimeSlot>
									</TimeContainer>
								)
							})}
						</TimeLine>
						{/* {agents?.map(agent => (
							<ShowingsRow agent={agent} key={agent.id} />
						))} */}
					</ShowingsGrid>
				</Grid>
			</LeftContainer>
			<RightContainer></RightContainer>
		</ScheduleContainer>
	)
}

const ScheduleContainer = styled.main`
	display: grid;
	grid-template-columns: 2.75fr 1.5fr;
	height: 100%;
`

const LeftContainer = styled.div`
	background: gray;
`
const RightContainer = styled.div`
	background: lightgray;
`

const Grid = styled.div`
	padding: 24px 0 0 24px;
	display: grid;
	grid-template-columns: 200px 1fr;
	overflow-y: scroll;
	height: 100%;

	background: ${({ theme: { colors } }) => colors.bg.primary};
	border-radius: 0 0 4px 4px;
`

const Agents = styled.div`
	padding-top: 8px;
	.agent-container {
		display: flex;
		align-items: center;

		.avatar {
			height: 48px;
			width: 48px;
			background: ${({ theme }) => theme.colors.secondary[500]};
			margin-right: 12px;
			border-radius: 4px;
		}

		.agent-row {
			grid-column: 0/1;
			display: flex;
			height: 56px;
			align-items: center;
			font-size: 0.9rem;
		}
	}
`
const ShowingsGrid = styled.div`
	width: 100%;
	overflow-x: visible;
	overflow-y: hidden;
	padding-bottom: 100px;
	padding-top: 8px;
`

const TimeLine = styled.div`
	display: grid;
	grid-template-columns: repeat(130, 24px);
	height: 56px;
	align-items: center;
	width: fit-content;

	border-bottom: 1px solid rgba(203, 213, 224, 0.4);
`

const TimeContainer = styled.div`
	position: relative;
	height: 100%;
	grid-column: ${({ startTime }: { startTime: string }) =>
		getColumnSpan(startTime, null, { alreadyStr: true })};
`

const TimeSlot = styled.div`
	position: absolute;
	font-size: 0.9rem;
	border-left: 1px solid ${({ theme }) => theme.colors.text.secondary};
	color: ${({ theme }) => theme.colors.secondary.primary};
	font-weight: 500;
	padding-left: 4px;
	height: 24px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* left: -100%; */
	top: 0;
	/* transform: translateY(-50%);  */

	/* text-align: center; */
`
