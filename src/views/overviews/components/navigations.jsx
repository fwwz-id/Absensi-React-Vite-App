import { NavLink } from "react-router-dom";

const links = [
	{
		path: "/",
		name: "Home",
	},
	{
		path: "/presences",
		name: "Presences",
	},
	{
		path: "/help",
		name: "Help",
	},
];

export function Drawer({ isOpen, children }) {
	return (
		<div
			className={`fixed w-full h-full inset-0 bg-white z-50 grid grid-rows-4 duration-300 transition ${
				isOpen
					? "opacity-100"
					: "-translate-x-full opacity-0"
			}`}>
			<div className="justify-self-center mt-10 space-y-2 row-span-1">
				{children}
			</div>
			<div className="flex flex-col row-start-2 row-end-4 items-center space-y-10">
				{links.map(({ path, name }, id) => (
					<NavLink key={id} to={path} className={({isActive}) => isActive ? "text-lg font-bold" : "text-lg"}>
						{name}
					</NavLink>
				))}
			</div>
			<div className="flex flex-col row-span-4 text-center space-y-5 self-end pb-10 items-center">
				<button className="w-max">Settings</button>
				<button className="w-max">Log Out</button>
			</div>
		</div>
	);
}

export function Menu({ children }) {
	return (
		<div className="hidden lg:grid lg:grid-rows-4 lg:w-4/12 lg:h-screen z-50 bg-slate-100">
			<div className="justify-self-center mt-10 space-y-2 row-span-1">
				{children}
			</div>
			<div className="row-start-2 row-end-4 flex flex-col items-center space-y-3">
				{
					//
					links.map(({ path, name }, id) => (
						<NavLink
							key={id}
							to={path}
							className={({ isActive }) =>
								isActive
									? "relative w-full text-center py-3 text-lg font-bold bg-fuchsia-400 text-white"
									: "relative py-3 text-lg"
							}>
							{name}
						</NavLink>
					))
				}
			</div>
			<div className="flex flex-col items-center row-span-4 text-center space-y-6 self-end pb-10">
				<button className="w-max">Settings</button>
				<button className="w-max">Log Out</button>
			</div>
		</div>
	);
}
