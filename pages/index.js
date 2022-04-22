import Navbar from "../components/GeneralComponents/Navbar/Navbar"
import Hero from "../components/HomeComponents/Hero/Hero"
import ExploreCollection from "../components/HomeComponents/ExploreCollection/ExploreCollection"
import Footer from "../components/GeneralComponents/Footer/Footer"
import { collection, getDocs } from "firebase/firestore"
import { db } from "./api/firebase/firebase"

export default function Home({ artworks }) {
	return (
		<>
			<Navbar></Navbar>
			<Hero></Hero>
			<ExploreCollection artworks={artworks} />
			<Footer></Footer>
		</>
	)
}

export async function getStaticProps() {
	let artworks = []

	const querySnapshot = await getDocs(collection(db, "artworks"))
	querySnapshot.forEach((doc) => {
		artworks.push({
			data: doc.data(),
			id: doc.id,
		})
	})
	return {
		props: {
			artworks,
		},
	}
}
