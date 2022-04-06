import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import http from "./http-common";
import routes from "./utils/constants/routes.const";

function App() {
	// handle csrf-token
	useEffect(() => {		
		const xcsrfLS = sessionStorage.getItem("userKey");

		if (!xcsrfLS) {
			http.get("/csrf").then((response) => {
				const {
					data: { token },
				} = response;

				sessionStorage.setItem("userKey", token);
				http.defaults.headers.common["x-csrf-token"] = token;
			});
		} else {
			http.defaults.headers.common["x-csrf-token"] = xcsrfLS;
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				{routes.map(({ path, Element }, id) => (
					<Route key={id} path={path} element={<Element />} />
				))}
			</Routes>
		</div>
	);
}

export default App;
