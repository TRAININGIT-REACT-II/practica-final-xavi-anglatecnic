import {useEffect, useState} from "react";
import JsonPretty from "./JsonPretty";
import useRequestUser from "../hooks/useRequestUser";

const Login = () => {

	const loginUser = useRequestUser('login',"Log Out","Log In");

	return (
		<>
			<p>Clickar para Logarte</p>
			<div>
				<input type="text" placeholder="Username"      onChange={loginUser.onChange("username")}  />
				<input type="password" placeholder="Password"  onChange={loginUser.onChange("password")} />
			</div>
			{loginUser.error}
			<button onClick={loginUser.call}>
				{loginUser.buttonText}
			</button>
			<JsonPretty data={loginUser.value}></JsonPretty>

		</>

	)
}

export default Login;
