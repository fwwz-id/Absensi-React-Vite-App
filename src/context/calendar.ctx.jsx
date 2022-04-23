import { useState, useCallback, createContext } from "react";

import useCalendar from "../hooks/useCalendar";

import dayjs from "dayjs";

export const CalendarCTX = createContext();

export default function CalendarProvider({ children }) {
	const { current, week, dates, setWeek, setDates, onCalendarChange } =
		useCalendar(dayjs().year(2022).month(1).date(8).toObject());
		//useCalendar();

	const [ isMorning, setIsMorning ] = useState(() => {
		const { hours } = dayjs().toObject();

		return hours >= 4 && hours < 15 ? true : false;
	})

	const changeToPrevWeek = useCallback(() => {
		return week > 1 ? setWeek((prev) => prev - 1) : null;
	}, [week]);

	const changeToNextWeek = useCallback(() => {
		return week <= 4 ? setWeek((prev) => prev + 1) : null;
	}, [week]);

	return (
		<CalendarCTX.Provider
			value={{
				current,
				week,
				dates,
				isMorning,
				setWeek,
				setDates,
				onCalendarChange,
				changeToPrevWeek,
				changeToNextWeek,
				setIsMorning
			}}>
			{children}
		</CalendarCTX.Provider>
	);
}
