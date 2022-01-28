import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '@app/contexts/auth/AuthProvider'
import { TeamProvider } from '@app/contexts/team/TeamProvider'

import { StyledToastContainer } from '@app/styles/components/ToastContainer'
import { GlobalStyles, theme } from '@app/styles/index'
import 'react-toastify/dist/ReactToastify.css'

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
						<StyledToastContainer position="bottom-center" newestOnTop />
						<Component {...pageProps} />
					</ThemeProvider>
				</AuthProvider>
			</TeamProvider>
		</>
	)
}

export default MyApp
