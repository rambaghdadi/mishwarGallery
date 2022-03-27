import classes from "./ExploreCollection.module.css"
import Image from "next/image"
import { useRouter } from "next/router"

export default function ExploreCollection() {
	const router = useRouter()

	return (
		<section className={classes.section}>
			<main className={classes.main}>
				<h1>Explore the Collection</h1>
				<div id="collection" className={classes.collection}>
					<Image src={"/images/ph1.jpeg"} width={800} height={800} />
					<Image src={"/images/ph2.jpeg"} width={800} height={800} />
					<Image src={"/images/ph3.jpeg"} width={800} height={800} />
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
