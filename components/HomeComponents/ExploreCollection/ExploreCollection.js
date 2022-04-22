import classes from "./ExploreCollection.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import { db } from "../../../pages/api/firebase/firebase"
import { collection } from "firebase/firestore"
import useSnapshot from "../../../hooks/useSnapshot"

export default function ExploreCollection() {
	const router = useRouter()
	const artworkCollection = collection(db, "artworks")
	const colls = useSnapshot(artworkCollection)

	return (
		<section className={classes.section}>
			<main className={classes.main}>
				<h1>Explore the Collection</h1>
				<div id="collection" className={classes.collection}>
					{colls
						.filter((img) => img.data.artworkArtist.includes("Abdullah Murad"))
						.slice(0, 3)
						.map((artwork) => {
							return (
								<div key={artwork.id}>
									<Image
										onClick={() => {
											router.push(`collection/${artwork.id}`)
										}}
										src={artwork.data.imgURL}
										width="400"
										height="400"
									></Image>
								</div>
							)
						})}
				</div>
				<button
					onClick={() => {
						router.push("/collection")
					}}
					className={classes.button}
				>
					<span>View Full Collection</span>
					<ion-icon name="chevron-forward"></ion-icon>
				</button>
			</main>
		</section>
	)
}
