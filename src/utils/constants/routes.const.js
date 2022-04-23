import Login from "../../views/authentications/login";
import Register from "../../views/authentications/register";
import NotFound from "../../views/NotFound";
import Dashboard from "../../views/overviews/dashboard";
import Presences from "../../views/overviews/presences";

const routes = [
	{
		path: "/*",
		Element: NotFound,
	},
	{
		path: "/login",
		Element: Login,
	},
	{
		path: "/register",
		Element: Register,
	},
	{
		path: "/",
		Element: Dashboard,
		isPrivate: true,
	},
	{
		path: "/presences",
		Element: Presences,
		isPrivate: true,
	},
];

export default routes;
