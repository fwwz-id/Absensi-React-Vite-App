import { useState } from "react";

import { Drawer } from "../navigations";

import { BiChevronRight } from "react-icons/bi";

function Sidebar() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="drawer">
			<div className="w-full lg:hidden">
				<div
					className="shadow-md w-fit p-1 rounded-tr-xl rounded-br-xl bg-fuchsia-500 cursor-pointer"
					onClick={() => setIsSidebarOpen(true)}>
					<BiChevronRight className="text-3xl text-white" />
				</div>
			</div>

			<Drawer isOpen={isSidebarOpen}>
				<div className="w-16 h-16 bg-sky-500 rounded-full mx-auto" />
				<p className="font-bold">Briyan Fajar Syahputra</p>
			</Drawer>
		</div>
	);
}

export default Sidebar;
