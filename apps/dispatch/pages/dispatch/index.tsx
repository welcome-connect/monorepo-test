import styled from 'styled-components'
import { Layout } from '../../components/common/Layout'
import { SideNav } from '../../components/common/SideNav'
import { TopNav } from '../../components/common/TopNav'
import { PageContainer } from '../../styles/components'

export default function DispatchHomePage() {
	return (
		<Layout hasSubSideBar={false}>
			<TopNav>
				<p>Dispatch</p>
			</TopNav>
			<SideNav></SideNav>
			<MPageCotainer>
				<h2>You are not part of a team! </h2>
			</MPageCotainer>
		</Layout>
	)
}

const MPageCotainer = styled(PageContainer)`
	display: grid;
	place-items: center;
`
