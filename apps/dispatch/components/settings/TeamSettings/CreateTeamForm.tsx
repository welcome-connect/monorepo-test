import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Coordinate } from '@app/types/google-maps'
import { Button, FieldSet, Form, Input, Label } from '@app/styles/components'
import { SearchPlaces } from '@app/components/google-map/SearchPlaces'
import { TeamCreateData } from '@app/types/forms'
import { Teams } from '@welcome-connect/firebase'
import { useRouter } from 'next/router'

export default function CreateTeamForm() {
	const [coords, setCoords] = useState<Coordinate | null>(null)
	const router = useRouter()

	function setCoordinates({ lat, lng }: Coordinate) {
		setCoords({ lat, lng })
	}

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TeamCreateData>()

	async function createTeam({ name }: TeamCreateData) {
		try {
			if (coords) {
				await Teams.createDoc({ name, coords })
				toast.success('✔ Team created successfully')
				router.push('/settings/teams')
			} else {
				toast.warn('⚠ Team location is required')
			}
		} catch (error) {
			toast.error('❌ Error creating team')
		}
	}

	return (
		<MForm onSubmit={handleSubmit(createTeam)}>
			<h3>Create team</h3>
			<MFieldSet>
				<MLabel>Team name</MLabel>
				<MInput
					type="text"
					{...register('name', { required: 'Team name is required' })}
					hasError={Boolean(errors.name?.message)}
				/>
			</MFieldSet>
			<SearchPlaces setCoordinates={setCoordinates} />
			<MButton isPrimary type="submit">
				Create team
			</MButton>
		</MForm>
	)
}

const MForm = styled(Form)`
	background-color: initial;
	width: fit-content;
	padding: 1rem;

	h3 {
		margin-bottom: 1rem;
	}
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

const MButton = styled(Button)`
	width: fit-content;
	font-size: 14px;
	font-weight: 500;
	padding: 8px 12px;
	border-radius: 4px;
	border-width: 2px;
`
