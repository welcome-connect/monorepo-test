import styled from 'styled-components'
import { DispatchIcon, SettingsIcon, ShowingsIcon, UserAvatarIcon } from '../../../icons'
import { SideNavIcon } from '../SideNavIcon'

export function SideNav() {
	return (
		<SideNavContainer>
			<IconsContainer>
				<SideNavIcon label="Dispatch" icon={DispatchIcon} href="dispatch" />
				<SideNavIcon label="Showings" icon={ShowingsIcon} href="showings" />
			</IconsContainer>
			<UserOptions>
				<SideNavIcon label="Settings" icon={SettingsIcon} href="settings" />
				<AvatarWrapper>
					<Avatar>
						<UserAvatarIcon />
					</Avatar>
				</AvatarWrapper>
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

const AvatarWrapper = styled.div`
	width: 64px;
	height: 64px;
	display: grid;
	place-items: center;
	cursor: pointer;

	&:hover,
	&:focus {
		background-color: ${({ theme: { colors } }) => colors.secondary[700]};
	}
`
