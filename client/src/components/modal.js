import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

import "./Modal.css";

/**
 * Muestra el contenido como un modal. Este componente hace uso de portales
 * para evitar problemas a la hora de renderizar el modal por encima de los
 * demás elementos de la interfaz
 */
const Modal = ({ children, show, onClose }) => {
	// Definimos una referencia vacia para el nuevo modal.
	const modalRef = useRef(null);
	// Obtenemos la referencia del elemento donde montaremos todos
	// los modales
	const modalGroupRef = useRef(document.getElementById("modals"));

	// Agregamos un nuevo elemento al DOM en mount y lo borramos
	// al quitar el componente
	useEffect(() => {
		const modalEl = document.createElement("div");
		modalEl.classList.add("modal-hidden");

		// lo agregamos al DOM manualmente
		modalGroupRef.current.appendChild(modalEl);
		// Guardamos la referencia
		modalRef.current = modalEl;

		return () => modalGroupRef.current.removeChild(modalRef.current);
	}, [])

	// Reaccionamos ante los cambios en show para mostrar y ocultar el modal
	useEffect(() => {
		if (modalRef.current != null) {
			if (show) {
				modalRef.current.classList.remove("modal-hidden");
			} else {
				modalRef.current.classList.add("modal-hidden");
			}
		}
	}, [show])

	// Renderizamos el componente
	if (show && modalRef.current != null) {
		return createPortal(
			<div role="dialog" aria-modal="true">
				<div className="modal-background" onClick={onClose}/>
				<div className="modal">
					<button
						className="modal-close outline"
						aria-label="Cerrar modal"
						onClick={onClose}
					>
						&times;
					</button>
					{children}
				</div>
			</div>,
			modalRef.current
		);
	} else {
		// No renderizamos nada si no hace falta
		return null;
	}
};

export default Modal;