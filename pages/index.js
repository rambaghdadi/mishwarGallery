import Navbar from "../components/GeneralComponents/Navbar/Navbar"
import Hero from "../components/HomeComponents/Hero/Hero"
import ExploreCollection from "../components/HomeComponents/ExploreCollection/ExploreCollection"
import Footer from "../components/GeneralComponents/Footer/Footer"

export default function Home() {
	return (
		<>
			<Navbar></Navbar>
			<Hero></Hero>
			<ExploreCollection />
			<Footer></Footer>
		</>
	)
}
