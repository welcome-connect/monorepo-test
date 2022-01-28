import styled from 'styled-components'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { format } from 'date-fns'

import { useTeam } from '@app/hooks/useTeam'
import { useAuth } from '@app/hooks/useAuth'

import { Layout, SideNav, TopNav } from '@app/components/common'
import { Button, PageContainer } from '@app/styles/components'
import { LeftCircleArrow, RightCircleArrow } from '@app/icons/index'
import { Schedule } from '@app/components/scheduler/Schedule'

export default function DispatchPage() {
	const [isLoading, setIsLoading] = useState(true)

	const router = useRouter()
	const { userDoc } = useAuth()
	const { team: userTeam, setTeam, initialRender } = useTeam()

	useEffect(() => {
		if (userDoc && userTeam) setIsLoading(false)
	}, [userDoc, userTeam])

	async function handleOnTeamSelect(e: ChangeEvent<HTMLSelectElement>) {
		await setTeam(e.target.value)
	}

	useEffect(() => {
		if (userTeam) {
			router.push(`/dispatch/${userTeam.name.replaceAll(' ', '-').toLowerCase()}`)
		}
	}, [userTeam])

	if (isLoading && initialRender) {
		return (
			<Loading>
				<p>Loading...</p>
			</Loading>
		)
	}

	return (
		<Layout hasSubSideBar={false}>
			<TopNav>
				<div>
					<PageTitle>Dispatch </PageTitle>
					<span> / </span>
					<Select onChange={handleOnTeamSelect}>
						{userDoc &&
							Object.entries(userDoc.teams).map(([teamId, teamName]) => {
								return (
									<Option
										value={teamId}
										key={teamId}
										selected={teamId === userTeam?.id}>
										{teamName}
									</Option>
								)
							})}
					</Select>
				</div>
				<DateContainer>
					<LeftCircleArrow />
					<p> {format(Date.now(), 'MMM do, yyyy')} </p>
					<RightCircleArrow />
				</DateContainer>
				<MButton isSecondary>Add Showing</MButton>
			</TopNav>
			<SideNav />
			<PageContainer>
				<Schedule />
			</PageContainer>
		</Layout>
	)
}

const Select = styled.select`
	background: ${({ theme: { colors } }) => colors.fg.primary};
	outline: none;
	border: none;
`
const Option = styled.option``
const PageTitle = styled.span`
	font-weight: 600;
`

const MButton = styled(Button)`
	width: fit-content;
	font-size: 14px;
	padding: 8px 12px;
	border-radius: 4px;
	border-width: 2px;
`

const DateContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	p {
		margin: 0 2rem;
	}
`

const Loading = styled.main`
	display: grid;
	place-content: center;
	width: 100vw;
	height: 100vh;
`
