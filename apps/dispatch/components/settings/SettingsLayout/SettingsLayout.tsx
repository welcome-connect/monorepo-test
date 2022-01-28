import styled from 'styled-components'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Button, PageContainer } from '@app/styles/components'
import { Layout, SideNav, SubMenuOption, SubSideNav, TopNav } from '@app/components/common'

interface SettingsLayoutPropsWithAction {
	children: ReactNode
	title: string
	hasAction: true
	action: {
		name: string
		callback: () => void
	}
}

interface SettingsLayoutPropsWithoutAction {
	children: ReactNode
	title: string
	hasAction: false
}

export function SettingsLayout(props: SettingsLayoutPropsWithAction): JSX.Element
export function SettingsLayout(props: SettingsLayoutPropsWithoutAction): JSX.Element
export function SettingsLayout(
	props: SettingsLayoutPropsWithAction | SettingsLayoutPropsWithoutAction
) {
	const router = useRouter()

	return (
		<Layout hasSubSideBar>
			<TopNav>
				<h4>{props.title}</h4>
				{props.hasAction ? (
					<MButton isPrimary onClick={props.action.callback}>
						{props.action.name}
					</MButton>
				) : null}
			</TopNav>
			<SideNav />
			<SubSideNav title="Settings">
				{subMenuOptions.map(option => {
					return (
						<SubMenuOption
							name={option.name}
							action={() => router.push(option.url)}
							isActive={router.pathname.includes(option.url)}
							key={option.name + option.url}
						/>
					)
				})}
			</SubSideNav>
			<PageContainer>{props.children}</PageContainer>
		</Layout>
	)
}

const subMenuOptions = [
	{ name: 'Account', url: '/settings/account' },
	{ name: 'Teams', url: '/settings/teams' },
	{ name: 'Agents', url: '/settings/agents' },
	{ name: 'Dispatchers', url: '/settings/dispatchers' }
]

const MButton = styled(Button)`
	width: fit-content;
	font-size: 14px;
	font-weight: 500;
	padding: 8px 12px;
	border-radius: 4px;
	border-width: 2px;
`
