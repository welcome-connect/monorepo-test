import { Router, useRouter } from 'next/dist/client/router'
import styled from 'styled-components'
import { SigninForm } from '../components/auth/SigninForm'
import { useAuth } from '../hooks/useAuth'
import { Logo } from '../icons/Logo'

export default function Home() {
	const router = useRouter()
	const { userAuth } = useAuth()

	if (userAuth) router.push('/dispatch')

	return (
		<PageLayout>
			<LeftColumn>
				<Logo />
			</LeftColumn>
			<RightColumn>
				<SigninForm />
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
