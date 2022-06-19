import { Link } from "react-router-dom";
function Error() {
	return (
		<div>
			<h1>No existo</h1>
			<Link to='/'>volver</Link>
		</div>
	);
}

export default Error;
