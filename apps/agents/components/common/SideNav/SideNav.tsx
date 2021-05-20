import styled from 'styled-components'
import { useAuth } from '../../../hooks/useAuth'
import { useTeam } from '../../../hooks/useTeam'
import { DispatchIcon, SettingsIcon, ShowingsIcon, UserAvatarIcon } from '../../../icons'
import { SideNavIcon } from '../SideNavIcon'
import { UserAvatar } from '../UserAvatar'

export function SideNav() {
	const { team } = useTeam()
	const { userDoc } = useAuth()

	return (
		<SideNavContainer>
			<IconsContainer>
				<SideNavIcon
					label="Dispatch"
					icon={DispatchIcon}
					href={
						team
							? `dispatch/${team?.name.replaceAll(' ', '-').toLowerCase()}`
							: userDoc && userDoc.teams.length > 0
							? `dispatch/${userDoc.teams[0]?.name
									.replaceAll(' ', '-')
									.toLowerCase()}`
							: 'dispatch'
					}
				/>
				<SideNavIcon label="Showings" icon={ShowingsIcon} href="showings" />
			</IconsContainer>
			<UserOptions>
				<SideNavIcon label="Settings" icon={SettingsIcon} href="settings" />
				<UserAvatar />
			</UserOptions>
		</SideNavContainer>
	)
}

const SideNavContainer = styled.aside`
	grid-area: side-nav;
	background-color: ${({ theme: { colors } }) => colors.secondary.primary};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	svg {
		width: 26px;
		height: auto;
	}
`

const IconsContainer = styled.nav`
	margin-top: 54px;
`
const UserOptions = styled.nav`
	display: grid;
	place-items: center;
`
