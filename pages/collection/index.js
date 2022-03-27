import Gallery from "../../components/CollectionComponents/Gallery/Gallery"
import Footer from "../../components/GeneralComponents/Footer/Footer"
import Navbar from "../../components/GeneralComponents/Navbar/Navbar"
import SecondaryHero from "../../components/GeneralComponents/SecondaryHero/SecondaryHero"

export default function Collection(props) {
	return (
		<>
			<Navbar />
			<SecondaryHero
				primarytitle={"Collection"}
				secondaryTitle={"Explore Our"}
			/>
			<Gallery />
			<Footer />
		</>
	)
}
