import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '../styles'
import { AuthProvider } from '../contexts/auth/AuthProvider'
import { TeamProvider } from '../contexts/team/TeamProvider'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
				<title>Welcome Dispatch</title>
			</Head>
			<TeamProvider>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<GlobalStyles />
						<Component {...pageProps} />
					</ThemeProvider>
				</AuthProvider>
			</TeamProvider>
		</>
	)
}

export default MyApp
