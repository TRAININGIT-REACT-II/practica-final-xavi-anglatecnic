import useRequestUser from "../hooks/useRequestUser";
import {lazy, Suspense, useEffect, useState} from "react";
import Login from "./LoginPage";

function Note() {

	return (
		<>
		<span>this.props.title</span>
		<span>this.props.content</span>
		<span>this.props.author</span>
		</>
	);
}

const Notes = () => {
	const logUser = useRequestUser('login');
	const [loading,setLoading] = useState(false);
	const [notes,setNotes] = useState([]);



	if(!logUser.isUserLogged()) {

		return (
			<>
				<div>Es necesario loggarte</div>
				<Login></Login>
			</>
		);
	}

	// useEffect(() => {
	// 	fetch("/api/notes")
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setNotes(data);
	// 		})
	// 		.finally(() => setLoading(false));
	// }, []);

	return (
		<>
			<h1>Notes</h1>
			<ul >
				{/*{notes.map(function (note) {*/}
				{/*	return (<Note note={note}></Note>);*/}
				{/*})}*/}
			</ul>
		</>
	);
};

export default Notes;