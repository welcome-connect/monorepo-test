import styled, { css } from 'styled-components'
import { ReactNode } from 'react'
import { useNavigation } from '@app/hooks/useNavigation'
import { LogoMark } from '@app/icons/index'

type LayoutProps = {
	children: ReactNode
	hasSubSideBar: boolean
}
export const Layout = ({ children, hasSubSideBar }: LayoutProps) => {
	const { isNavExpanded } = useNavigation()

	return (
		<LayoutContainer className={isNavExpanded ? 'menu-open' : ''} hasSubSideBar={hasSubSideBar}>
			<LogoContainer>
				<LogoMark fill="white" />
			</LogoContainer>
			{children}
		</LayoutContainer>
	)
}

const LayoutContainer = styled.div`
	height: 100vh;
	max-width: 100vw;
	display: grid;
	grid-template-rows: 64px auto;
	transition: width 150ms ease-in-out;

	${({ hasSubSideBar }: { hasSubSideBar: boolean }) => {
		if (hasSubSideBar) {
			return css`
				grid-template-columns: 64px max-content auto;
				grid-template-areas:
					'logo sub-menu top-nav'
					'side-nav sub-menu .';

				&.menu-open {
					grid-template-columns: 180px 100px auto;
				}
			`
		} else {
			return css`
				grid-template-columns: 64px auto;
				grid-template-areas:
					'logo top-nav'
					'side-nav .';

				&.menu-open {
					grid-template-columns: 180px auto;
				}
			`
		}
	}}
`

const LogoContainer = styled.div`
	background-color: ${({ theme: { colors } }) => colors.main.primary};
	display: grid;
	place-content: center;
	grid-area: logo;

	svg {
		width: 34px;
		height: auto;
	}
`
