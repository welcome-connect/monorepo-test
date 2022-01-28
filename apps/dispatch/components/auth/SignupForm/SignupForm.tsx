import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { UserSignupData } from '@app/types/forms'
import { Button, FieldSet, Form, Input, Label } from '@app/styles/components'
import { useAuth } from '@app/hooks/useAuth'
import { formatPhoneNumber } from '@app/utils/formatPhoneNumber'

export function SignupForm() {
	const { signup, isLoading } = useAuth()
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserSignupData>()

	async function onSubmit(formValues: UserSignupData) {
		await signup({ ...formValues, phoneNumber: formatPhoneNumber(formValues.phoneNumber) })
		router.push('/dispatch')
	}

	if (isLoading) return <p>Loading...</p>

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h1>
				Sign up to <span>Welcome</span>
			</h1>
			<FieldSet>
				<Label htmlFor="displayName">Full name</Label>
				<Input
					type="text"
					{...register('displayName', {
						required: 'Your name is required'
					})}
					placeholder="enter your full name"
					hasError={Boolean(errors.displayName?.message)}
				/>
			</FieldSet>
			<FieldSet>
				<Label htmlFor="email">Email address</Label>
				<Input
					type="email"
					{...register('email', {
						required: 'Your email is required',
						pattern: {
							value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Incorrect email format'
						}
					})}
					placeholder="enter your email"
					hasError={Boolean(errors.email?.message)}
				/>
			</FieldSet>
			<FieldSet>
				<Label htmlFor="phoneNumber">Phone number</Label>
				<Input
					type="text"
					{...register('phoneNumber', {
						required: 'Your phone number is required'
					})}
					placeholder="enter your phone number"
					hasError={Boolean(errors.phoneNumber?.message)}
				/>
			</FieldSet>
			<FieldSet>
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					{...register('password', {
						required: 'Your password is required'
					})}
					placeholder="enter your password"
					hasError={Boolean(errors.password?.message)}
				/>
			</FieldSet>
			<Button type="submit" isPrimary>
				Sign up
			</Button>
			<Link href="/">
				<a>
					already a member ? <span>Sign in</span>
				</a>
			</Link>
		</Form>
	)
}
