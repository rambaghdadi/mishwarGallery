import "../styles/globals.css"
import Head from "next/head"
import Script from "next/script"
import { AuthProvider } from "../context/AuthContext"
import ProtectedRoute from "../components/AuthComponents/ProtectedRoute"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Loader } from "@mantine/core"

function MyApp({ Component, pageProps: { ...pageProps } }) {
	const authRequired = ["/admin"]
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		function start() {
			console.log("Start")
			setLoading(true)
		}
		function end() {
			console.log("Finished")
			setLoading(false)
		}
		router.events.on("routeChangeStart", start)
		router.events.on("routeChangeComplete", end)
		router.events.on("routeChangeError", end)

		return () => {
			router.events.off("routeChangeStart", start)
			router.events.off("routeChangeComplete", end)
			router.events.off("routeChangeError", end)
		}
	}, [])

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
						<Component {...pageProps} />
					</ProtectedRoute>
				) : loading ? (
					<Loader
						className={"loader"}
						color="yellow"
						size="xl"
						variant="dots"
					/>
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
