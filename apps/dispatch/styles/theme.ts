import { DefaultTheme } from 'styled-components'
import 'styled-components'

interface Color {
	100?: string
	200?: string
	300?: string
	400?: string
	500?: string
	600?: string
	700?: string
	800?: string
	900?: string
}

interface ColorPrincipal extends Color {
	primary: string
	hover: string
}

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			main: ColorPrincipal
			secondary: ColorPrincipal
			bg: {
				primary: string
				onWhite: string
			}
			fg: {
				primary: string
				primary_hover: string
			}
			text: {
				primary: string
				secondary: string
				white: string
				inactive: string
				input: string
			}
			error: {
				alert: string
				alert_hover: string
				warning: string
			}
		}
		media: {
			tablet_landscape: string
			tablet_portrait: string
			mobile_landscape: string
			mobile_portrait: string
		}
	}
}

export const theme: DefaultTheme = {
	colors: {
		main: {
			primary: '#00D084',
			hover: '#33D99D',
			'100': '#E6FBF3',
			'200': '#CCF6E6',
			'300': '#B3F1DB',
			'400': '#99ECCE',
			'500': '#80E8C2',
			'600': '#66E3B5',
			'700': '#4DDFA9',
			'800': '#33D99D',
			'900': '#1AD591'
		},
		secondary: {
			primary: '#383F51',
			hover: '#606574',
			'100': '#F5F5F6',
			'200': '#ECECEE',
			'300': '#D7D9DC',
			'400': '#AFB2B9',
			'500': '#888C97',
			'600': '#606574',
			'700': '#2F3646'
		},
		bg: {
			primary: '#F2F4F7',
			onWhite: '#F2F5F9'
		},
		fg: {
			primary: '#FFFFFF',
			primary_hover: '#E5EAF0'
		},
		text: {
			primary: '#242935',
			secondary: '#52575C',
			white: '#FFFFFF',
			inactive: '#A0A4A8',
			input: '#CACCCF'
		},
		error: {
			alert: '#FB4E4E',
			alert_hover: '#F56565',
			warning: '#FCC812'
		}
	},
	media: {
		tablet_landscape: '1200px',
		tablet_portrait: '1024px',
		mobile_landscape: '768px',
		mobile_portrait: '480px'
	}
}
