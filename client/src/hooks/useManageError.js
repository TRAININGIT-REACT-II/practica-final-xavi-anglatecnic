import {useState} from "react";

const useManageError = () => {

	const [selector,setSelector] =useState('message-error');
	const [lastError,setLastError] =useState('');

	const fetchError =  (data) => {
		if(data.hasOwnProperty('error')) {
			setLastError(data.error)
			//showError(data.error)
			return true;
		}
		return false;
	}
	return {
		fetchError : fetchError,
		setSelector : setSelector,
		setLastError : setLastError,
		lastError : lastError,
		getSelectorClass : () => {
			return selector;
		}
	}

}

export default useManageError;