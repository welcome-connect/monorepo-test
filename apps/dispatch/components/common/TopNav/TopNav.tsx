import { ReactNode } from 'react'
import styled from 'styled-components'

type TopNavProps = {
	children: ReactNode
}

export function TopNav({ children }: TopNavProps) {
	return <TopNavContainer>{children}</TopNavContainer>
}

const TopNavContainer = styled.header`
	grid-area: top-nav;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.secondary[300]};
`
