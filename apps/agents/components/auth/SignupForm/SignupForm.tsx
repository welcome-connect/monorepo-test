import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button, FieldSet, Form, Input, Label } from '../../../styles/components'

type UserSignupData = {
	display_name: string
	email: string
	phone_number: number
	password: string
}

export function SignupForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserSignupData>()

	function onSubmit(formValues: UserSignupData) {
		console.log(formValues)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h1>
				Sign up to <span>Welcome</span>
			</h1>
			<FieldSet>
				<Label htmlFor="display_name">Full name</Label>
				<Input
					type="text"
					{...register('display_name', {
						required: 'Your name is required'
					})}
					placeholder="enter your full name"
					hasError={Boolean(errors.display_name?.message)}
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
				<Label htmlFor="phone_number">Phone number</Label>
				<Input
					type="text"
					{...register('phone_number', {
						required: 'Your phone number is required'
					})}
					placeholder="enter your phone number"
					hasError={Boolean(errors.phone_number?.message)}
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
