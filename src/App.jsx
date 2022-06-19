import "./App.css";
import Home from "./components/Home";
import Error from "./components/Error";
import List from "./components/List";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
	return (
		<div className='App'>
			<h1>HackList</h1>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/lista/:id' element={<List />} />
				<Route path='*' element={<Error />} />
			</Routes>
		</div>
	);
}

export default App;
