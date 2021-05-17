import { ReactNode } from 'react'
import styled from 'styled-components'

type SubSideNavProps = {
	title: string
	children: ReactNode
}

export function SubSideNav({ title, children }: SubSideNavProps) {
	return (
		<SubSideNavContainer>
			<Title>
				<p>{title}</p>
			</Title>
			<Options>{children}</Options>
		</SubSideNavContainer>
	)
}

const SubSideNavContainer = styled.aside`
	grid-area: sub-menu;
	display: grid;
	grid-template-rows: 64px auto;
`

const Title = styled.div`
	p {
		color: ${({ theme: { colors } }) => colors.text.white};
	}
	background-color: ${({ theme: { colors } }) => colors.secondary.primary};
	padding: 1rem;
	display: flex;
	align-items: center;
`
const Options = styled.div`
	background-color: ${({ theme: { colors } }) => colors.secondary[700]};
	p {
		padding: 0.5rem 2rem 0.5rem 1rem;
		color: ${({ theme: { colors } }) => colors.text.white};
		cursor: pointer;
		&:hover {
			background-color: ${({ theme: { colors } }) => colors.text.primary};
		}
	}
`
