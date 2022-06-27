import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {render} from "react-dom";

const useRequestUser = (type,OkText,KoText) => {

	//useLogged
	const [logText,setLogText] = useState(KoText);
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
	useEffect(() => {
		var res = JSON.parse(localStorage.getItem("isLogged"));
		console.log(res);
		setLogged(res);
	})
	useEffect(() => {

		if(typeof isLogged !== 'undefined') {

		}
		else if(isLogged) {
			console.log(isLogged);
			console.log(logData);
			setLogData(JSON.parse(localStorage.getItem("logData")));
		} else {
			// render(
			// 	<Redirect to="/"></Redirect>
			// )
			localStorage.setItem("isLogged", JSON.parse(false));
			localStorage.removeItem("logData");
			setLogData({
				username : formUsername,
				password : formPassword
			});
		}

	}, [isLogged]);

	useEffect(() => {
		setLogText(isLogged ? OkText : KoText)
	},[isLogged]);

	const onChange = (key) => {

		return (e) => {
			switch (key) {
				case 'username':
					setFormUsername(e.target.value)
					break;
				case 'password':
					setFormPassword(e.target.value)
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
					localStorage.setItem("isLogged", JSON.stringify(false));
				}else {
					setLogData(data);
					localStorage.setItem("logData", JSON.stringify(logData));
					localStorage.setItem("isLogged", JSON.stringify(true));
					setLogged(true);
				}
				console.log('Success:', data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
	return {
		value : logData,
		error: errorMessage,
		buttonText : logText,
		setLogData,
		setErrorMessage,
		call,
		onChange,
		isLogged
	}

}

export default useRequestUser;