import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import http from "./http-common";
import jwtDecode from "jwt-decode";

import Auth from "./utils/lib/auth.lib";

import { loading, loaded, failed } from "./store/auth/auth.slice";

import routes from "./utils/constants/routes.const";
import { CalendarCTX } from "./context/calendar.ctx";

import { disciplesThunk } from "./store/data/disciples/disciples.slice";

function PrivateRoute({ auth, children }) {
	if (!auth) return <Navigate to="/login" />;

	return children;
}

function App() {
	const dispatch = useDispatch();
	const { auth, disciples } = useSelector((state) => state);
	const { current } = useContext(CalendarCTX);

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

	useEffect(() => {
		const isLoggedIn = Auth.getToken();

		dispatch(loading());

		if (!!isLoggedIn) {
			http.defaults.headers.common[
				"Authorization"
			] = `Bearer ${JSON.parse(isLoggedIn)}`;

			const { id, username, role } = jwtDecode(isLoggedIn);

			dispatch(loaded({ id, username, role }));
		} else {
			dispatch(failed());
		}
	}, []);

	useEffect(() => {
		const {
			data: { id },
			isAuth,
		} = auth;

		if (isAuth) {
			const date = `${current.years}-${
				current.months >= 10 ? current.months : `0${current.months}`
			}-${current.date >= 10 ? current.date : `0${current.date}`}`;

			dispatch(disciplesThunk({ id, date }));
		}
	}, [auth]);

	return (
		<div className="App">
			<Routes>
				{routes.map(({ path, Element, isPrivate }, id) => (
					<Route
						key={id}
						path={path}
						element={
							isPrivate ? (
								<PrivateRoute auth={auth.isAuth}>
									<Element />
								</PrivateRoute>
							) : (
								<Element />
							)
						}
					/>
				))}
			</Routes>
		</div>
	);
}

export default App;
