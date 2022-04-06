function Sidebar() {
	return (
		<div className="fixed w-full h-full inset-0 bg-white z-50 grid grid-rows-4">
			<div className="justify-self-center mt-10 space-y-2 row-span-1">
				<div className="w-16 h-16 bg-sky-500 rounded-full mx-auto" />
				<p className="font-bold">Briyan Fajar Syahputra</p>
			</div>
			<div className="row-start-2 row-end-4 text-center space-y-10">
				<div className="text-xl font-bold">Home</div>
				<div className="text-xl">Presensi</div>
				<div className="text-xl">Help</div>
			</div>
			<div className="row-span-4 text-center space-y-5 self-end pb-10">
				<div>Settings</div>
				<div>Log Out</div>
			</div>
		</div>
	);
}

export default Sidebar;
