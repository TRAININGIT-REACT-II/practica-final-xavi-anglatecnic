import {useEffect, useRef, useState} from "react";
import Login from "../components/LoginPage";
import {useHistory} from "react-router-dom";
import LoginPage from "../components/LoginPage";

const useRequestUser = (type,OkText,KoText) => {

	//useLogged
	const [logText,setLogText] = useState(KoText);
	const [token,setToken] = useState(localStorage.getItem('token'));
	const [isLogged, setLogged] = useState(false);
	const [errorMessage,setErrorMessage] = useState("");
	const [formUsername,setFormUsername] = useState("");
	const [formPassword,setFormPassword] = useState("");

	const [logData,setLogData] = useState({
		username : "",
		password : ""
	});
	const isUserLogged = function () {
		return isLogged;
	};
	const history = useHistory();

	useEffect(() => {
		if(token && token.length > 0) {
			console.log("saving token");
			localStorage.setItem("token",token);
			//history.push('/notes');
		} else {
			localStorage.removeItem('token');
		}
	},[token]);

	// useEffect(() => {
	// 	var res = JSON.parse(localStorage.getItem("isLogged"));
	// 	console.log(res);
	// 	setLogged(res);
	// })
	// useEffect(() => {
	//
	// 	if(typeof isLogged !== 'undefined') {
	//
	// 	}
	// 	else if(isLogged) {
	// 		console.log(isLogged);
	// 		console.log(logData);
	// 		setLogData(JSON.parse(localStorage.getItem("logData")));
	// 	} else {
	// 		// render(
	// 		// 	<Redirect to="/"></Redirect>
	// 		// )
	// 		localStorage.setItem("isLogged", JSON.parse(false));
	// 		localStorage.removeItem("logData");
	// 		setLogData({
	// 			username : formUsername,
	// 			password : formPassword
	// 		});
	// 	}
	//
	// }, [isLogged]);

	useEffect(() => {
		setLogText(isLogged ? OkText : KoText)
	},[isLogged,token]);

	const onChange = (key) => {

		return (e) => {
			switch (key) {
				case 'username':
					setLogData({
						...logData,
						[key] : e.target.value
					})
					break;
				case 'password':
					setLogData({
						...logData,
						[key] : e.target.value
					})
					break;
			}
		}

		//setLogged(!isLogged);
	}
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(logData)
	};

	const call = () => {
		if(isLogged) {
			setLogged(false);
			return;
		}
		fetch("/api/"+type,requestOptions)
			.then(response => response.json())
			.then((data) => {
				if(data.error) {
					setErrorMessage(data.error);
					setLogged(false);
					setToken('');
				}else {
					setToken(data.token);
					history.push('/notes');
				}
				console.log('Success:', data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	const logginMandatori = () => {
		return (
			<>
				<div>Es necesario loggarte</div>
				<Login></Login>
			</>
		);
	}
	const logout = () => {
		setToken('');
		window.location.reload();
	}
	return {
		value : logData,
		error: errorMessage,
		buttonText : logText,
		setLogData,
		setErrorMessage,
		call,
		onChange,
		isLogged,
		token,
		setToken,
		logginMandatori,
		logout
	}

}

export default useRequestUser;