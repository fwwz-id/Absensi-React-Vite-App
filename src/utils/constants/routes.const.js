import Login from "../../views/authentications/login";
import Register from "../../views/authentications/register";
import NotFound from "../../views/NotFound";
import Dashboard from "../../views/overviews/dashboard";

const routes = [
	{
		path: "/*",
		Element: NotFound,
	},
	{
		path: "/",
		Element: Dashboard
	},
	{
		path: "/login",
		Element: Login,
	},
	{
		path: "/register",
		Element: Register,
	},
];

export default routes;
