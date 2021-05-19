import { useRouter } from 'next/dist/client/router'
import styled, { css } from 'styled-components'

type SubMenuOpntionProps = {
	name: string
	action: () => void
	isActive: boolean
}

export function SubMenuOption({ name, action, isActive }: SubMenuOpntionProps) {
	return (
		<SubMenuOptionContainer isActive={isActive} onClick={action}>
			{name}
		</SubMenuOptionContainer>
	)
}

const SubMenuOptionContainer = styled.div`
	padding: 0.5rem 2rem 0.5rem 1rem;
	color: ${({ theme: { colors } }) => colors.text.white};
	cursor: pointer;
	font-weight: 300;
	font-size: 14px;
	&:hover {
		background-color: ${({ theme: { colors } }) => colors.text.primary};
	}

	${({ isActive }: { isActive: boolean }) =>
		isActive &&
		css`
			background-color: ${({ theme: { colors } }) => colors.text.primary};
		`}
`
