import styled from 'styled-components'
import { User } from '@welcome-connect/firebase/@types'
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter'
import { Button } from '@app/styles/components'

export function UserCard({ user }: { user: User }) {
	return (
		<CardContainer>
			<div>
				<UserName>{user.displayName}</UserName>
				<UserTitle>{capitalizeFirstLetter(user.roles[0])}</UserTitle>
			</div>
			<Actions>
				<MButton isWarning>Remove</MButton>
			</Actions>
		</CardContainer>
	)
}

const CardContainer = styled.div`
	background: ${({ theme }) => theme.colors.fg.primary};
	padding: 1rem;
	border-radius: 4px;
	width: 300px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
const UserName = styled.strong`
	font-weight: 500;
`
const UserTitle = styled.span`
	display: block;
	margin-right: 16px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.text.secondary};
`

const Actions = styled.div``
const MButton = styled(Button)`
	width: fit-content;
	font-size: 14px;
	font-weight: 500;
	padding: 8px 12px;
	border-radius: 4px;
    border: none;
`
