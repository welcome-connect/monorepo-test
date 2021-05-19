import styled from 'styled-components'
import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { UserAvatarIcon } from '../../../icons'

export function UserAvatar() {
	const [showUserOptions, setShowUserOptions] = useState(false)
	const { signout } = useAuth()
	return (
		<AvatarWrapper
			onMouseEnter={() => setShowUserOptions(true)}
			onMouseLeave={() => setShowUserOptions(false)}>
			{showUserOptions ? (
				<UserOptions>
					<UserOption onClick={signout}>Logout</UserOption>
				</UserOptions>
			) : null}
			<Avatar>
				<UserAvatarIcon />
			</Avatar>
		</AvatarWrapper>
	)
}

const AvatarWrapper = styled.div`
	width: 64px;
	height: 64px;
	display: grid;
	place-items: center;
	cursor: pointer;
	position: relative;

	&:hover,
	&:focus {
		background-color: ${({ theme: { colors } }) => colors.secondary[700]};
	}
`

const Avatar = styled.div`
	width: 44px;
	height: 44px;
	background-color: ${({ theme: { colors } }) => colors.bg.primary};
	display: grid;
	place-content: center;
	border-radius: 100%;

	svg {
		width: 26px;
		height: auto;
	}
`

const UserOptions = styled.div`
	position: absolute;
	top: 50%;
	left: 100%;
	display: grid;
	place-items: center;
	transform: translateY(-50%);
	border-radius: 8px;
	background-color: ${({ theme: { colors } }) => colors.secondary.hover};
`
const UserOption = styled.div`
	cursor: pointer;
	padding: 8px;
	font-size: 14px;

	border-radius: 8px;
	color: ${({ theme: { colors } }) => colors.text.white};
	&:hover {
		background-color: ${({ theme: { colors } }) => colors.secondary[500]};
	}
`
