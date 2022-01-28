import styled from 'styled-components'
import { useEffect } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { useAuth } from '@app/hooks/useAuth'
import { formatPhoneNumber } from '@app/utils/formatPhoneNumber'

import { FieldSet, Form, Input, Label } from '@app/styles/components'

export function AccountSettings({
	formController
}: {
	formController: UseFormReturn<FieldValues>
}) {
	const { userDoc } = useAuth()

	useEffect(
		function setFormInitialState() {
			if (userDoc) {
				formController.setValue('displayName', userDoc.displayName)
				formController.setValue('email', userDoc.email)
				formController.setValue(
					'phoneNumber',
					formatPhoneNumber(userDoc.phoneNumber, '($2) $3-$4')
				)
			}
		},
		[userDoc]
	)

	return (
		<MForm>
			<MFieldSet>
				<MLabel htmlFor="displayName">Display name</MLabel>
				<MInput
					type="text"
					{...formController.register('displayName')}
					hasError={Boolean(formController.formState.errors.displayName?.message)}
				/>
			</MFieldSet>
			<MFieldSet>
				<MLabel htmlFor="email">Email</MLabel>
				<MInput
					type="text"
					{...formController.register('email')}
					hasError={Boolean(formController.formState.errors.email?.message)}
				/>
			</MFieldSet>
			<MFieldSet>
				<MLabel htmlFor="phoneNumber">Phone number</MLabel>
				<MInput
					type="text"
					{...formController.register('phoneNumber')}
					hasError={Boolean(formController.formState.errors.phoneNumber?.message)}
				/>
			</MFieldSet>
		</MForm>
	)
}

const MForm = styled(Form)`
	background-color: initial;
	width: fit-content;
	padding: 1rem;
`

const MInput = styled(Input)`
	background-color: ${({ theme }) => theme.colors.fg.primary};
	font-size: 14px;
`

const MLabel = styled(Label)`
	font-size: 14px;
`

const MFieldSet = styled(FieldSet)`
	margin-bottom: 1rem;
`
