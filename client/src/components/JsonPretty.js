import {memo} from "react";

const PrettyPrintJson = memo(({data}) => (<div><pre>{
	JSON.stringify(data, null, 2) }</pre></div>));

export default PrettyPrintJson;
