import Status from "./Status";
import {useEffect, useState} from "react";

const S = () => {

	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(true);

	// Cargamos el estado del servidor
	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setStatus(data.status === "ok"))
			.finally(() => setLoading(false));
	}, []);

	return (
		<p>
			Estado del servidor:
			{loading ? " Cargando..." : <Status status={status} />}
		</p>
	)
}

export default S;
