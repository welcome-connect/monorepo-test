import { useRouter } from 'next/dist/client/router'
import { FC, useState } from 'react'
import styled, { css } from 'styled-components'

type SideNavIconProps = {
	label: string
	icon: FC<{ fill?: string }>
	href: string
}

export function SideNavIcon({ label, icon: Icon, href }: SideNavIconProps) {
	const [showLabel, setShowLabel] = useState(false)
	const router = useRouter()
	const isActive = router.pathname.includes(href)

	return (
		<IconWrapper
			onMouseEnter={() => setShowLabel(true)}
			onMouseLeave={() => setShowLabel(false)}
			isActive={isActive}
			onClick={() => router.push(`/${href}`)}>
			<Icon />
			{showLabel ? <HoveringLabel>{label}</HoveringLabel> : null}
		</IconWrapper>
	)
}

const IconWrapper = styled.div`
	width: 64px;
	height: 54px;
	display: grid;
	place-items: center;
	cursor: pointer;

	position: relative;

	&:hover,
	&:focus {
		background-color: ${({ theme: { colors } }) => colors.secondary[700]};
	}

	${({ isActive }: { isActive: boolean }) =>
		isActive &&
		css`
			background-color: ${({ theme: { colors } }) => colors.secondary[700]};
		`}
`

const HoveringLabel = styled.div`
	position: absolute;
	top: 50%;
	left: 110%;
	transform: translateY(-50%);
	padding: 8px;
	font-size: 14px;
	color: ${({ theme: { colors } }) => colors.text.white};
	border-radius: 8px;
	background-color: ${({ theme: { colors } }) => colors.secondary.hover};
`
