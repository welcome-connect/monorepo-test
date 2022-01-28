import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Poppins';
		list-style: none;
  }

	body {
		font-family: 'Roboto';
		
		h1, h2, h3, h4, p, span, a, label, strong {
			font-family: 'Poppins';
			color: ${({ theme }) => theme.colors.text.primary};
		}

		p, span, a, strong {
			font-size: 14px;
		}

		ul {
			list-style: none;
		}
	}

	/* GOOGLE AUTOCOMPLETE */
	.pac-container {
		.pac-item {
			&:hover {
				background: ${({ theme }) => theme.colors.secondary.hover};
			}
			.pac-item-query {
				font-size: 1rem;
			}
			
			span:last-child {
				font-size: 14px;
			}
		}

		&::after {
			display: none;
		}
	}
`
