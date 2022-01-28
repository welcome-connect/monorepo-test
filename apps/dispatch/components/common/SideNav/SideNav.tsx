import styled from 'styled-components'
import { useAuth } from '@app/hooks/useAuth'
import { useTeam } from '@app/hooks/useTeam'
import { DispatchIcon, SettingsIcon, ShowingsIcon } from '@app/icons/index'
import { SideNavIcon, UserAvatar } from '@app/components/common'

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
							: userDoc && Object.keys(userDoc.teams).length > 0
							? `dispatch/${Object.values(userDoc.teams)[0]
									.replaceAll(' ', '-')
									.toLowerCase()}`
							: 'dispatch'
					}
				/>
				<SideNavIcon label="Showings" icon={ShowingsIcon} href="showings" />
			</IconsContainer>
			<UserOptions>
				<SideNavIcon label="Settings" icon={SettingsIcon} href="settings/account" />
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
	margin-top: 1rem;
`
const UserOptions = styled.nav`
	display: grid;
	place-items: center;
`
