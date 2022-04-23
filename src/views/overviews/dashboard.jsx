import { useContext } from "react";
import { useSelector } from "react-redux";

// context
import { CalendarCTX } from "../../context/calendar.ctx";

// reducer-actions / constants
import { days } from "../../utils/constants/days-n-months-names.const";

// components
import Layout from "./components/templates/layout";
import Calendar from "./components/templates/calendars";

// icons
import { BiUser } from "react-icons/bi";

import "./style.css";
import CircularStatus from "./components/circular-status";

export default function Dashboard() {
	const { auth, disciples } = useSelector((state) => state);
	const { isMorning } = useContext(CalendarCTX);

	return (
		<Layout>
			<div className="content">
				<header className="flex flex-wrap items-center justify-between py-2 space-y-2 sm:space-y-0 lg:w-full lg:hidden">
					<div className="space-y-2">
						<p className="font-bold text-3xl">{days.long[0]}</p>
						<p className="text-secondary text-xs sm:text-sm md:text-base lg:text-lg">
							Welcome{" "}
							<span className="font-bold">
								{auth.data.username}
							</span>
						</p>
					</div>
					<div>
						<div className="p-6 bg-sky-500 rounded-full">
							<BiUser className="text-white text-xl" />
						</div>
					</div>
				</header>

				<div className="calendar-components-wrapper">
					<Calendar />
				</div>

				<div className="mt-10 grid gap-4 lg:grid-cols-2">
					{disciples.status === "loaded" &&
						disciples.data.length > 0 &&
						disciples.data.map(
							({
								username,
								presences: { _id: id, morning, info },
							}) => {
								let elem = (
									<div key={id} className="card">
										<p className="card-content">
											{username}
										</p>
										<CircularStatus status={info} />
									</div>
								);
								if (isMorning) {
									return (
										morning && elem
									);
								}else{
									return !morning && elem
								}
							}
						)}
				</div>
			</div>
		</Layout>
	);
}
