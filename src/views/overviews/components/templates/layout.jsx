import { Fragment } from "react";
import { useSelector } from "react-redux";

import { Menu } from "../navigations";
import Sidebar from "./sidebar";

import { BiUser } from "react-icons/bi";

function Layout({ children }) {
	const { auth } = useSelector(state => state);

	return (
		<Fragment>
			<Sidebar />

			<div className="content-container">
				<Menu>
					<div className="w-16 h-16 bg-sky-500 rounded-full mx-auto grid place-items-center">
						<BiUser className="fill-white" />
					</div>
					<p className="font-bold">{auth.data.username}</p>
				</Menu>

				{children}
			</div>
		</Fragment>
	);
}

export default Layout;
