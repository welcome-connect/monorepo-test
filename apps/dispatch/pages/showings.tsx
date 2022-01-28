import { Layout, SideNav, TopNav } from '@app/components/common'
import { useAuth } from '@app/hooks/useAuth'
import { Button, PageContainer } from '@app/styles/components'

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
