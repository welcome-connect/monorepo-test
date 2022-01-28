import styled, { css } from 'styled-components'

type ButtonAtts = {
	isPrimary?: boolean
	isSecondary?: boolean
	isTertiary?: boolean
	isDisabled?: boolean
	isWarning?: boolean
}

export const Button = styled.button`
	padding: 16px;
	border-radius: 16px;
	cursor: pointer;
	font-size: 18px;
	font-weight: 600;
	width: 100%;
	box-sizing: border-box;
	transition: all 150ms ease-in-out;

	@media (max-width: 1440px) {
		font-size: 14px;
	}

	${({ isPrimary }: ButtonAtts) =>
		isPrimary &&
		css`
			color: ${({ theme: { colors } }) => colors.text.white};
			background: ${({ theme: { colors } }) => colors.main.primary};
			border: none;

			&.active,
			&:hover,
			&:active,
			&:focus {
				background-color: ${({ theme: { colors } }) => colors.main.hover};
				transition: all 150ms ease-in-out;
			}
		`}

	${({ isSecondary }: ButtonAtts) =>
		isSecondary &&
		css`
			color: ${({ theme: { colors } }) => colors.main.primary};
			background: ${({ theme: { colors } }) => colors.text.white};
			border: 1px solid ${({ theme: { colors } }) => colors.main.primary};

			&.active,
			&:hover,
			&:active,
			&:focus {
				color: ${({ theme: { colors } }) => colors.text.white};
				background: ${({ theme: { colors } }) => colors.main.primary};
				transition: all 150ms ease-in-out;
			}
		`}
  
    ${({ isTertiary }: ButtonAtts) =>
		isTertiary &&
		css`
			background-color: transparent;
			color: ${({ theme: { colors } }) => colors.text.inactive};
			border: 2px solid ${({ theme: { colors } }) => colors.secondary[500]};

			&.active,
			&:hover,
			&:active,
			&:focus {
				border: 2px solid ${({ theme: { colors } }) => colors.error.alert};
				color: ${({ theme: { colors } }) => colors.error.alert};
				transition: all 150ms ease-in-out;
			}
		`}

  ${({ isDisabled }: ButtonAtts) =>
		isDisabled &&
		css`
			color: ${({ theme: { colors } }) => colors.text.inactive};
			background: ${({ theme: { colors } }) => colors.text.white};
			border: 1px solid ${({ theme: { colors } }) => colors.text.inactive};
		`}

  ${({ isWarning }: ButtonAtts) =>
		isWarning &&
		css`
			color: ${({ theme: { colors } }) => colors.text.white};
			background: ${({ theme: { colors } }) => colors.error.alert_hover};
			border: 1px solid ${({ theme: { colors } }) => colors.error.alert_hover};

			&.active,
			&:hover,
			&:active,
			&:focus {
				background-color: ${({ theme: { colors } }) => colors.error.alert};
				transition: all 150ms ease-in-out;
			}
		`}
`
