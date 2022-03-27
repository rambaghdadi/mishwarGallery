import "../styles/globals.css"
import Head from "next/head"
import Script from "next/script"
import { AuthProvider } from "../context/AuthContext"
import ProtectedRoute from "../components/AuthComponents/ProtectedRoute"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps: { ...pageProps } }) {
	const authRequired = ["/admin"]
	const router = useRouter()
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width"
					initial-scale="1.0"
				/>
				<meta name="description" content="Mishwar Gallery" />
				<meta name="keywords" content="Art, Gallery, Mishwar, Painting" />
				<link rel="icon" href="/images/Mishwar-Logo-Small.ico" />

				<title>Mishwar Gallery</title>
			</Head>

			<AuthProvider>
				{authRequired.includes(router.pathname) ? (
					<ProtectedRoute>
						<Component {...pageProps} />{" "}
					</ProtectedRoute>
				) : (
					<Component {...pageProps} />
				)}
			</AuthProvider>
			<Script
				type="module"
				src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
			></Script>
			<Script
				nomodule
				src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
			></Script>
		</>
	)
}

export default MyApp
