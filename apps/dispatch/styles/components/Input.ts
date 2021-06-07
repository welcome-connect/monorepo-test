import styled, { css } from 'styled-components'

export const Input = styled.input`
	font-size: 18px;
	padding: 16px;
	border-radius: 16px;
	border: 2px solid ${({ theme: { colors } }) => colors.fg.primary};
	background: ${({ theme: { colors } }) => colors.bg.primary};
	color: ${({ theme: { colors } }) => colors.text.primary};
	transition: all 100ms ease-in-out;
	outline: none;

	@media (max-width: 1440px) {
		font-size: 14px;
	}

	&:not(:placeholder-shown) {
		border: 2px solid ${({ theme: { colors } }) => colors.fg.primary};
		color: ${({ theme: { colors } }) => colors.text};
		transition: all 150ms ease-in-out;
	}

	&:active,
	&:focus {
		border: 2px solid ${({ theme: { colors } }) => colors.secondary.hover};
		transition: all 150ms ease-in-out;
	}

	${({ hasError }: { hasError?: boolean }) =>
		hasError &&
		css`
			border: 2px solid ${({ theme: { colors } }) => colors.error.alert};
			transition: all 150ms ease-in-out;

			&:active,
			&:focus {
				border: 2px solid ${({ theme: { colors } }) => colors.error.alert};
				transition: all 150ms ease-in-out;
			}
		`}

	&:disabled {
		background: ${({ theme }) => theme.colors.secondary[800]};
		border: 2px solid ${({ theme: { colors } }) => colors.secondary[500]};
	}
`
