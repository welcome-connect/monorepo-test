import styled from 'styled-components'

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme: { colors } }) => colors.fg.primary};
	color: ${({ theme: { colors } }) => colors.text};
	padding: 70px;
	min-width: 600px;
	border-radius: 32px;

	@media (max-width: 1440px) {
		min-width: 480px;
		padding: 48px;
	}

	h1 {
		margin-bottom: 68px;
		span {
			font-size: 32px;
		}
		@media (max-width: 1440px) {
			span {
				font-size: 28px;
			}
			font-size: 28px;
			margin-bottom: 48px;
		}
	}

	span {
		color: ${({ theme: { colors } }) => colors.main.primary};
	}

	a {
		text-decoration: none;
		margin-top: 24px;
		font-size: 18px;
		color: ${({ theme: { colors } }) => colors.secondary[600]};

		@media (max-width: 1440px) {
			font-size: 14px;
		}
		span {
			color: ${({ theme: { colors } }) => colors.secondary.primary};
			font-size: 14px;
			font-weight: 600;
		}
	}

	button {
		margin-top: 36px;

		@media (max-width: 1440px) {
			margin-top: 24px;
		}
	}
`
