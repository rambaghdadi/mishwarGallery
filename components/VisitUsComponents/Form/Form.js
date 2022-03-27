import { Button, Dialog, Group, Text } from "@mantine/core"
import { addDoc, collection } from "firebase/firestore"
import { useRef, useState } from "react"
import { db } from "../../../pages/api/firebase/firebase"
import NotificationAlert from "../../GeneralComponents/NotificationAlert/NotificationAlert"
import classes from "./Form.module.css"

//send form

export default function Form(props) {
	const [notification, setNotification] = useState(false)
	const formName = useRef()
	const formEmail = useRef()
	const formMessage = useRef()

	const messageCollection = collection(db, "messages")
	async function formHandler(e) {
		e.preventDefault()
		try {
			const response = await addDoc(messageCollection, {
				name: formName.current.value,
				message: formMessage.current.value,
				email: formEmail.current.value,
				date: new Date().toISOString(),
			})
			setNotification({
				headline: "Success",
				message: "Your message has been sent!",
			})
			e.target.reset()
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
			<NotificationAlert
				opened={notification}
				onClose={() => setNotification(false)}
				notificationHeadline={notification.headline}
				notificationMessage={notification.message}
				onClick={() => setNotification(false)}
			/>
			<div className={classes.main}>
				<h2>{props.title}</h2>
				<form onSubmit={formHandler} className={classes.form}>
					<div className={classes.inputs}>
						<label htmlFor="name">Your Name</label>
						<input
							className={classes.input}
							type="text"
							name="name"
							id="name"
							required
							ref={formName}
						/>
						<label htmlFor="email">Your Email</label>
						<input
							className={classes.input}
							type="email"
							name="email"
							id="email"
							required
							ref={formEmail}
						/>

						<label htmlFor="message">Your Message</label>

						<textarea
							className={classes.input}
							name="message"
							id="message"
							cols="30"
							rows="10"
							required
							ref={formMessage}
						/>
					</div>
					<button type="submit" className={classes.submitButton}>
						Submit
					</button>
				</form>
			</div>
		</>
	)
}
