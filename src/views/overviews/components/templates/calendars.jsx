import { Fragment, useContext } from "react";

// context
import { CalendarCTX } from "../../../../context/calendar.ctx";

// constants
import {
	CHANGE_DATE,
	CHANGE_MONTH,
	CHANGE_YEAR,
} from "../../../../utils/constants/custom-hooks-w-reducer.const";
import {
	days,
	months,
} from "../../../../utils/constants/days-n-months-names.const";

// icons / additions
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Calendar() {
	const {
		current,
		week,
		dates,
		isMorning,
		onCalendarChange,
		changeToPrevWeek,
		changeToNextWeek,
		setIsMorning,
	} = useContext(CalendarCTX);

	return (
		<Fragment>

			{/* Week Position and Button Week onChange */}
			<div className="space-y-2">
				<p className="text-xs sm:text-sm text-secondary">{`${
					current.date
				} ${months.short[current.months - 1]} ${current.years}`}</p>
				<div className="flex items-center justify-between">
					<p className="font-bold text-xl">Pekan {week}</p>
					<div className="flex space-x-2">
						<button
							className={`${
								week === 1
									? "bg-zinc-100"
									: "bg-sky-500 text-white"
							} rounded text-2xl cursor-pointer disable-on-white-surface`}
							onClick={() => changeToPrevWeek()}
							disabled={week === 1}>
							<BiChevronLeft />
						</button>
						<button
							className={`${
								week === 5
									? "bg-zinc-100"
									: "bg-sky-500 text-white"
							} rounded text-2xl cursor-pointer disable-on-white-surface`}
							onClick={() => changeToNextWeek()}
							disabled={week === 5}>
							<BiChevronRight />
						</button>
					</div>
				</div>
			</div>
			{/* End of Week Position and Button Week onChange */}

			{/* Date */}
			<div className="relative grid grid-cols-7 gap-2">
				{dates[week - 1].map(
					({ date, isActive, isBefore, isAfter }, i) => (
						<div key={i} className="date-wrapper">
							<div
								onClick={() =>
									onCalendarChange(CHANGE_DATE, date)
								}
								className={`date-inside ${
									(isBefore || isAfter) &&
									"text-secondary prev-or-after"
								} ${isActive && "bg-sky-200"}`}>
								{date}
							</div>
						</div>
					)
				)}
			</div>
			<div className="hidden md:grid md:grid-cols-7 md:gap-2">
				{days.long.map((day, i) => (
					<p className="text-center font-bold text-sm" key={i}>
						{day}
					</p>
				))}
			</div>
			<div className="text-xs font-bold grid grid-cols-7 gap-2 md:hidden">
				{days.short.map((day, i) => (
					<p className="text-center text-xs" key={i}>
						{day}
					</p>
				))}
			</div>
			{/* End of Date */}

			{/* Morning and Evening filter */}
			<div className="grid grid-cols-2 gap-4 justify-items-center">
				<button
					className={`btn w-full border rounded ${
						isMorning ? "btn-primary" : "border-sky-200"
					}`}
					onClick={() => setIsMorning(true)}>
					Pagi
				</button>
				<button
					className={`btn w-full border rounded ${
						!isMorning ? "btn-primary" : "border-sky-200"
					}`}
					onClick={() => setIsMorning(false)}>
					Sore
				</button>
			</div>
			{/* End of Morning and Evening filter */}
		</Fragment>
	);
}
