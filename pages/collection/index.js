import { collection, getDocs } from "firebase/firestore"
import Gallery from "../../components/CollectionComponents/Gallery/Gallery"
import Footer from "../../components/GeneralComponents/Footer/Footer"
import Navbar from "../../components/GeneralComponents/Navbar/Navbar"
import SecondaryHero from "../../components/GeneralComponents/SecondaryHero/SecondaryHero"
import { db } from "../api/firebase/firebase"

export default function Collection({ artworks }) {
	return (
		<>
			<Navbar />
			<SecondaryHero
				primarytitle={"Collection"}
				secondaryTitle={"Explore Our"}
			/>
			<Gallery art={artworks} />
			<Footer />
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
		revalidate: 10,
	}
}
