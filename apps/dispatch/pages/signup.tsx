import styled from 'styled-components'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@app/hooks/useAuth'
import { SignupForm } from '@app/components/auth/SignupForm'
import { Logo } from '@app/icons/index'

export default function Signup() {
	const { userAuth } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (userAuth) router.push('/dispatch')
	}, [userAuth])

	return (
		<PageLayout>
			<LeftColumn>
				<Logo />
			</LeftColumn>
			<RightColumn>
				<SignupForm />
			</RightColumn>
		</PageLayout>
	)
}

const PageLayout = styled.main`
	background-color: ${({ theme }) => theme.colors.bg.primary};
	height: 100vh;
	width: 100vw;

	display: grid;
	grid-template-columns: minmax(400px, 1.25fr) 3fr;
`

const LeftColumn = styled.div`
	height: 100vh;
	width: 100%;
	background: ${({ theme: { colors } }) => colors.text.primary};
	padding: 48px;

	svg {
		width: 168px;
		height: auto;

		@media (max-width: 1440px) {
			width: 140px;
		}
	}
`
const RightColumn = styled.div`
	height: 100vh;
	width: 100%;
	background: ${({ theme: { colors } }) => colors.bg.primary};
	display: grid;
	place-content: center;
`
