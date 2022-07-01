import useRequestUser from "../hooks/useRequestUser";
import {useEffect, useRef, useState} from "react";
import useManageError from "../hooks/useManageError";
import {useHistory} from "react-router-dom";
import JsonPretty from "./JsonPretty";
import Modal from "./modal";
import ErrorBoundary from "./ErrorBoundary";


const Notes = () => {
	const errors = useManageError();
	const logUser = useRequestUser('login');
	const [loading,setLoading] = useState(false);
	const [notes,setNotes] = useState([]);
	const [changes,setNoteChanges] = useState({});
	const [numNotes,setNumNotes] = useState(0);
	const [titulo,setTitulo] = useState('');
	const [content,setContent] = useState('');
	const [showMode,setShowMode] = useState('read');
	const [showModal,setShowModal] = useState('');

	const history = useHistory();

	useEffect(() => {
		console.log("Call");
		if(!logUser.token) {
			history.push('/login');
			errors.setLastError("Usuario no logado");

			return;
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

					setShowModal('create');
					setNumNotes(data.id);
					document.getElementsByClassName('create-input')[0].value = "";
					document.getElementsByClassName('create-input')[1].value = "";
					setTitulo("");
					setContent("");
				}

			})
			.finally(() => setLoading(false));
	}

	const editarNota = function (id) {

		return (e) => fetch("/api/notes/"+id,{
			method : "PUT",
			headers : {
				'api-token' :  logUser.token,
				'Content-Type': 'application/json'
			},
			body : JSON.stringify({
				"title" : changes[id].title,
				"content" : changes[id].content,
			})
		})
			.then((res) => res.json())
			.then(() => {
				setShowModal('edit');
				console.log("Nota borrada correctamente");
				setNumNotes(numNotes-1)
				setNoteChanges({})
			});
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

				setShowModal('delete');
				console.log("Nota borrada correctamente");
				setNumNotes(numNotes-1)
			});
	};

	const onChange =  (key,note) => {

		return (e) => {
			switch (key) {
				case 'edit-content':
					setNoteChanges({
						...changes,
						[note.id] : {

							'title' : note.title,
							...changes[note.id],
							'content' : e.target.value
						}
					})
					break;
				case 'edit-title':

					setNoteChanges({
						...changes,
						[note.id] : {
							'content' : note.content,
							...changes[note.id],
							'title' : e.target.value
						}
					})
					break;
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

	const onClickToggleMode = function (e) {
		setShowModal('change-view');
		setShowMode(showMode === 'read' ? 'edit' : 'read');
	}

	const openModal =function () {

	}
	const closeModal = function () {
		setShowModal('');
	}


	return (
		<>
			<ErrorBoundary message={"Algo ha ido mal en las notas"}>
			<h1>Notes</h1>
			<button className={'button-edit'} onClick={onClickToggleMode}>{showMode === 'read' ? 'EditMode' : 'ReadMode'}</button>
			<span className={errors.getSelectorClass()}>{errors.lastError}</span>
			<ul className={'lista-de-notas'}>
				{
					notes.map((noteItem,index) => (
						<li key={'note-'+index} className={'note'} >
							{ showMode === 'read' ?
								<>
									<span className={'note-title'} >{noteItem.title}</span>
									<span className={'note-content'} >{noteItem.content}</span>
								</>
								:
								<>
									<div>
										<div>
											<label className={'minim-size'}>Título</label>
											<input className={'edit-title'} type={'text'} defaultValue={noteItem.title}   onChange={onChange('edit-title',noteItem)}  />
										</div>
										<div>
											<label className={'minim-size'}>Contenido</label>
											<input className={'edit-content'} type={'text'} defaultValue={noteItem.content}   onChange={onChange('edit-content',noteItem)}  />
										</div>
									</div>


									<button onClick={editarNota(noteItem.id)} >Editar</button>
									<Modal show={showModal === 'edit'} onClose={closeModal}>
										<h3>La nota ha sido actualizada correctamente</h3>
									</Modal>
								</>
							}

							<button onClick={borrarNota(noteItem.id)} >Eliminar</button>
							<Modal show={showModal === 'delete'} onClose={closeModal}>
								<h3>La nota ha sido borrada correctamente</h3>
							</Modal>
							<Modal show={showModal === 'change-view'} onClose={closeModal}>
								<h3>El modo de lectura ha cambiado a: {showMode}</h3>
							</Modal>
						</li>
					))
				}
				<li className={'create-container'+' note'}>
					<label>Titulo</label><input className={'create-input'} type={'text'} onChange={onChange('titulo')} />
					<label>Contenido</label><input className={'create-input'} type={'text'} onChange={onChange('content')} />
					<button onClick={onClickCreate}>Crear</button>
					<Modal show={showModal === 'create'} onClose={closeModal}>
						<h3>La nota ha sido creada correctamente y se ha insertado correctamente</h3>
					</Modal>
				</li>
			</ul>
			</ErrorBoundary>

		</>
	);
};

export default Notes;