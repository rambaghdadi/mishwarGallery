import { collection } from "firebase/firestore"
import { useEffect, useState } from "react"
import useSnapshot from "../../../hooks/useSnapshot"
import { db } from "../../../pages/api/firebase/firebase"
import classes from "./Filter.module.css"

export default function Filter(props) {
	const [artists, setArtists] = useState([])
	const [selectedArtist, setSelectedArtists] = useState(null)
	const artworkCollection = collection(db, "artworks")
	const colls = useSnapshot(artworkCollection)

	let artistCollection = []

	//TODO fix safari

	useEffect(() => {
		getArtists()
	}, [colls])

	function getArtists() {
		colls
			.map((x) => x.data.artworkArtist)
			.forEach((arr) => {
				return artistCollection.push(...arr)
			})

		let filteredArtists = [...new Set(artistCollection)]

		const sortedArtists = filteredArtists.sort((a, b) => {
			const nameA = a.toUpperCase()
			const nameB = b.toUpperCase()
			if (nameA < nameB) {
				return -1
			}
			if (nameA > nameB) {
				return 1
			}

			return 0
		})

		setArtists(sortedArtists)
	}

	function filterHandler(e) {
		props.selectedArtist(e.target.value)
		setSelectedArtists(e.target.value)
	}

	return (
		<div className={classes.main}>
			<form onChange={filterHandler} className={classes.form}>
				<select name="select" id="artists">
					<option value="all">All</option>
					{artists.map((artist) => (
						<option key={artist} value={artist}>
							{artist}
						</option>
					))}
				</select>
				<ul>
					<option
						className={
							selectedArtist === "all" || !selectedArtist
								? `${classes.selected}`
								: ""
						}
						onClick={filterHandler}
						value="all"
					>
						All
					</option>

					{artists.map((artist) => (
						<option
							onClick={filterHandler}
							key={artist}
							value={artist}
							className={artist === selectedArtist ? `${classes.selected}` : ""}
						>
							{artist}
						</option>
					))}
				</ul>
			</form>
		</div>
	)
}
