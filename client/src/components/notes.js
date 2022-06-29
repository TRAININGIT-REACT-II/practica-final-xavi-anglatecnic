import useRequestUser from "../hooks/useRequestUser";
import {useEffect, useRef, useState} from "react";
import useManageError from "../hooks/useManageError";
import {useHistory} from "react-router-dom";
import JsonPretty from "./JsonPretty";


const Notes = () => {
	const errors = useManageError();
	const logUser = useRequestUser('login');
	const [loading,setLoading] = useState(false);
	const [notes,setNotes] = useState([]);
	const [numNotes,setNumNotes] = useState(0);
	const [titulo,setTitulo] = useState('');
	const [content,setContent] = useState('');

	const history = useHistory();

	useEffect(() => {
		if(!logUser.token) {
			history.push('/login');
			errors.setLastError("Usuario no logado");

		}
		fetch("/api/notes",{
			method : "GET",
			headers : {
				'api-token' :  logUser.token,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if(!errors.fetchError(data)) {
					setNotes(data);
				}

			})
			.finally(() => setLoading(false));
	}, [numNotes]);

	const onClickCreate = function () {
		if(titulo.trim()   === "" && content.trim() === "" ) {
			errors.fetchError({error : "Los valores no pueden estar vacios"});
			return;
		}
		if(!logUser.token) {
			history.push('/login');
			errors.setLastError("Usuario no logado");

		}
		fetch("/api/notes",{
			method : "POST",
			headers : {
				'api-token' :  logUser.token,
				'Content-Type': 'application/json'
			},
			body : JSON.stringify({
				"title": titulo,//"Título de la nota",
				"content": content,//"Contenido de la nota",
			})
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if(!errors.fetchError(data)) {
					setNumNotes(data.id);
					document.getElementsByClassName('create-input')[0].value = "";
					document.getElementsByClassName('create-input')[1].value = "";
					setTitulo("");
					setContent("");
				}

			})
			.finally(() => setLoading(false));
	}

	const borrarNota = function (id) {
		return (e) => fetch("/api/notes/"+id,{
			method : "DELETE",
			headers : {
				'api-token' :  logUser.token

			}
		})
			.then((res) => res.json())
			.then(() => {
				console.log("Nota borrada correctamente");
				setNumNotes(numNotes-1)
			});
	};

	const onChange =  (key) => {

		return (e) => {
			switch (key) {
				case 'titulo':
					setTitulo(e.target.value)
					break;
				case 'content':
					setContent(e.target.value)
					break;
			}
		}

		//setLogged(!isLogged);
	}


	return (
		<>
			<h1>Notes</h1>
			<span className={errors.getSelectorClass()}>{errors.lastError}</span>
			<ul className={'lista-de-notas'}>
				{
					notes.map((noteItem,index) => (
						<li key={'note-'+index} className={'note'}>
							<span>{noteItem.title}</span>
							<span>{noteItem.content}</span>
							<button onClick={borrarNota(noteItem.id)} ></button>
						</li>
					))
				}
			</ul>
			<h2>Nueva nota</h2>
			<label>Titulo</label><input className={'create-input'} type={'text'} onChange={onChange('titulo')} />
			<label>Contenido</label><input className={'create-input'} type={'text'} onChange={onChange('content')} />
			<button onClick={onClickCreate}>Crear</button>
			<JsonPretty data={titulo}></JsonPretty>
			<JsonPretty data={content}></JsonPretty>
		</>
	);
};

export default Notes;