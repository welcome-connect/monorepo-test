import { Layout } from '../components/common/Layout'
import { SideNav } from '../components/common/SideNav'
import { TopNav } from '../components/common/TopNav'
import { useAuth } from '../hooks/useAuth'
import { Button, PageContainer } from '../styles/components'

export default function ShowingsPage() {
	const { signout } = useAuth()

	return (
		<Layout hasSubSideBar={false}>
			<TopNav>
				<p>Showings</p>
			</TopNav>
			<SideNav></SideNav>
			<PageContainer>
				<h1>Showings</h1>
				<Button isSecondary onClick={signout}>
					Logout
				</Button>
			</PageContainer>
		</Layout>
	)
}
