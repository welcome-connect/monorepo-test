import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useAuth } from '@app/hooks/useAuth'
import { Button, FieldSet, Form, Input, Label } from '@app/styles/components'

type UserSignInData = {
	email: string
	password: string
}

export function SigninForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserSignInData>()

	const { signin, isLoading, error } = useAuth()

	async function onSubmit(formValues: UserSignInData) {
		await signin(formValues.email, formValues.password)
	}

	if (isLoading) return <p>Loading...</p>

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h1>
				Sign in to <span>Welcome</span>
			</h1>

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

			{error ? <p>Incorrect password</p> : null}

			<Button type="submit" isPrimary>
				Sign in
			</Button>

			<Link href="/signup">
				<a>
					not a member yet ? <span>Sign up now</span>
				</a>
			</Link>
		</Form>
	)
}
