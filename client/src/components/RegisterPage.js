import {useEffect, useState} from "react";
import JsonPretty from "./JsonPretty";
import useRequestUser from "../hooks/useRequestUser";

const Register = () => {

	const registerUser = useRequestUser('register',"Register");


	// Cargamos el estado del servidor

	return (
		<>
			<p>Clickar para Registrarte</p>
			<div>
				<input type="text" placeholder="Username"     defaultValue={registerUser.value.username} onChange={registerUser.onChange("username")}  />
				<input type="password" placeholder="Password" defaultValue={registerUser.value.password} onChange={registerUser.onChange("password")} />
			</div>
			{registerUser.error}
			<button onClick={registerUser.call}>
			Registrar
			</button>
			<JsonPretty data={registerUser.value}></JsonPretty>

		</>

	)
}

export default Register;
