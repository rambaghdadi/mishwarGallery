import Filter from "../Filter/Filter"
import classes from "./Gallery.module.css"
import Image from "next/image"
import { collection } from "firebase/firestore"
import { db } from "../../../pages/api/firebase/firebase"
import useSnapshot from "../../../hooks/useSnapshot"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Gallery(props) {
	const [artworks, setArtworks] = useState([])
	const router = useRouter()

	let colls = props.art

	useEffect(() => {
		selectedArtistHandler("all")
	}, [colls])

	function selectedArtistHandler(artist) {
		if (artist === "all") {
			setArtworks(colls)
			return
		}

		setArtworks(
			colls.filter((artwork) => artwork.data.artworkArtist.includes(artist))
		)
	}

	return (
		<div className={classes.main}>
			<Filter selectedArtist={selectedArtistHandler} />
			<motion.div
				animate={{ x: 0, opacity: 1 }}
				initial={{ x: -200, opacity: 0 }}
				transition={{ ease: "easeOut", duration: 0.4, type: "tween" }}
				className={classes.gallery}
			>
				{artworks.map((x) => (
					<motion.div
						animate={{ x: 0, opacity: 1 }}
						initial={{ x: -200, opacity: 0 }}
						transition={{ ease: "easeOut", duration: 0.2, type: "tween" }}
						key={x.id}
					>
						<Image
							src={x.data.imgURL ? x.data.imgURL : "/images/default.jpeg"}
							height={800}
							width={800}
							onClick={() => {
								router.push(`collection/${x.id}`)
							}}
						/>
					</motion.div>
				))}
			</motion.div>
		</div>
	)
}
