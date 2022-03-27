import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { db } from "../api/firebase/firebase"
import Navbar from "../../components/GeneralComponents/Navbar/Navbar"
import ArtworkDetails from "../../components/CollectionComponents/ArtworkDetails/ArtworkDetails"
import Footer from "../../components/GeneralComponents/Footer/Footer"
import { useState } from "react"
import { Modal, Button, Group } from "@mantine/core"
import Form from "../../components/CollectionComponents/Form/Form"
import NotificationAlert from "../../components/GeneralComponents/NotificationAlert/NotificationAlert"

export default function Artwork({ artwork }) {
	const [opened, setOpened] = useState(false)
	const [notification, setNotification] = useState(false)

	const messageCollection = collection(db, "artworkEnquiry")

	async function formHandler(data) {
		try {
			const response = await addDoc(messageCollection, {
				...data,
				artworkName: artwork.artworkName,
				date: new Date().toISOString(),
			})
			setNotification({
				headline: "Success",
				message: "Your message has been sent!",
			})
			console.log(response)
		} catch (error) {
			console.log(error)
			setNotification({
				headline: "Error",
				message: "Please try again later!",
			})
		}
	}

	return (
		<>
			<Modal
				onClose={() => setOpened(false)}
				centered
				opened={opened}
				title={"Enquire about this artwork using the form below."}
			>
				{
					<Form
						formInput={formHandler}
						value={artwork.artworkName}
						onSend={() => {
							setOpened(false)
						}}
					/>
				}
			</Modal>
			<NotificationAlert
				opened={notification}
				onClose={() => setNotification(false)}
				notificationHeadline={notification.headline}
				notificationMessage={notification.message}
				onClick={() => setNotification(false)}
			/>
			<Navbar></Navbar>
			<ArtworkDetails
				src={artwork.imgURL}
				name={artwork.artworkName}
				artist={artwork.artworkArtist.filter((x) => x !== "Mishwar Collection")}
				description={artwork.artworkDescription}
				artworkWidth={artwork.artworkWidth}
				artworkHeight={artwork.artworkHeight}
				onClick={() => setOpened(true)}
			/>
			<Footer></Footer>
		</>
	)
}

export async function getServerSideProps(context) {
	let artwork
	try {
		const { artworkID } = context.params

		const docRef = doc(db, "artworks", artworkID)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			artwork = { ...docSnap.data() }
			console.log("Document data:", docSnap.data())
		} else {
			// doc.data() will be undefined in this case
			return {
				redirect: {
					permanent: false,
					destination: "/404",
				},
			}
		}
	} catch (error) {
		console.log(error)
	}

	return {
		props: {
			artwork,
		},
	}
}
