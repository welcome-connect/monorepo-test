import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'

export const StyledToastContainer = styled(ToastContainer)`
	.Toastify__toast-container {
		font-size: 14px;
	}

	.Toastify__toast {
		font-size: 14px;
	}

	.Toastify__toast--error {
		font-size: 14px;
		background-color: ${({ theme }) => theme.colors.error.alert};
	}

	.Toastify__toast--warning {
		font-size: 14px;
		background-color: ${({ theme }) => theme.colors.error.warning};
	}

	.Toastify__toast--success {
		font-size: 14px;
		background-color: ${({ theme }) => theme.colors.main.primary};
	}

	.Toastify__toast-body {
		font-size: 14px;
	}

	.Toastify__progress-bar {
		font-size: 14px;
	}
`
