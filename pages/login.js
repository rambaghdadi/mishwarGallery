import {
	Input,
	PasswordInput,
	Button,
	Container,
	Center,
	Stack,
} from "@mantine/core"
import { useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/router"

export default function Login(props) {
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const { user, login } = useAuth()
	const router = useRouter()

	async function submitHandler(e) {
		e.preventDefault()
		console.log(user)

		try {
			setError("")
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			router.replace("/admin")
		} catch (error) {
			setError("Failed to sign in")
		}
		setLoading(false)
	}

	return (
		<Container
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				marginTop: "50vh",
				transform: "translate(0,-70%)",
			}}
		>
			{/* <Center> */}
			<Stack spacing="xl">
				<h1>Login</h1>
				{error && <h2>{error}</h2>}
				<form
					style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
					onSubmit={submitHandler}
				>
					<label htmlFor="email">Email</label>
					<Input
						placeholder="Email"
						id={"email"}
						size="md"
						required
						ref={emailRef}
					/>
					<label htmlFor="password">Password</label>
					<PasswordInput
						id="password"
						placeholder="Password"
						size="md"
						ref={passwordRef}
						required
					/>
					<Button disabled={loading} type="submit" size="md">
						Login
					</Button>
				</form>
			</Stack>
			{/* </Center> */}
		</Container>
	)
}
