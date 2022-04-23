import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

import CalendarProvider from "./context/calendar.ctx";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<CalendarProvider>
					<App />
				</CalendarProvider>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
