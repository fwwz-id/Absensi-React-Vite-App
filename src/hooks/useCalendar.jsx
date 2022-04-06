import { useState, useReducer, useEffect } from "react";

import produce from "immer";
import dayjs from "dayjs";
import "../utils/lib/date.lib";

// constants
const __defaults = {
	date: dayjs().toObject(),
};

// actions
export const CHANGE_YEAR = "CHANGE_YEAR";
export const CHANGE_MONTH = "CHANGE_MONTH";
export const CHANGE_DATE = "CHANGE_DATE";

const reducer = produce((draft, action) => {
	const { type, payload } = action;

	switch (type) {
		case CHANGE_DATE:
			draft.date.date = payload;
			break;
		case CHANGE_MONTH:
			draft.date.months = payload;
			break;
		case CHANGE_YEAR:
			draft.date.years = payload;
			break;

		default:
			return draft;
	}
});

// custom hook
function useWeek(date) {
	const [week, setWeek] = useState(1);
	const [dateByWeek, setDateByWeek] = useState(() => {
		// eslint-disable-next-line
		const {current, ...dates} = getWeeks(date);
		return dates
	});

	// date => { years: 2022, months: 2, date: 30, ...times }
	function getWeeks(date) {
		let weeks = {
			0: [],
			1: [],
			2: [],
			3: [],
			4: [],
			current: 1,
		};

		/*
			# Absolute rules ->
			1. first date is always first week, and last date is always last week.
			2. weeks are 4 each months, "programmer count from zero".
		*/

		/*
			(date, day -> day count from 0)
			(1 = date 1, 2 = wednesday)
	
			const current = dayjs('2022-02-01').date(0) // march 01 2022
		*/

		/*
			# Steps
			1. get the start date and the end date of each week,
				e.g current has (1,2) as the start date of the first week, and (5,6) as the end date of the first week.
					current has (6,0) as the start date of the second week, and (12,6) as the end date of the second week.
					and so on.
	
			2. get the day of the start date of current week and subtract with the total rest of the day of current week
				e.g current.date(1).day() -> 2, 2 - 6 = 4
		*/

		const __date__ = dayjs(date);

		const current = {
			_date: __date__.date(), // 30
			_day: __date__.day(), // 3
			_month: __date__.month(), // 2
			_year: __date__.year(), // 2022
		};

		const __utils__ = {
			__startDate: __date__.date(1).date(),
			__endDate: __date__.daysInMonth(),
			__startDay: __date__.date(1).day(),
			__endDay: __date__.day(__date__.daysInMonth).day(),
			__monthBefore: __date__.month(current._month - 1),
			__monthAfter: __date__.month(current._month + 1),
			__totalWeekday: 6,
		};

		// adding date from month before that still in a row
		for (
			let totalDateOfMonthBefore = __utils__.__monthBefore.daysInMonth(),
				lastDayPosOfEndOfMonthBefore = __utils__.__monthBefore
					.date(__utils__.__monthBefore.daysInMonth())
					.day(); // day position count from 0
			lastDayPosOfEndOfMonthBefore >= 0;
			totalDateOfMonthBefore--, lastDayPosOfEndOfMonthBefore--
		) {
			if (lastDayPosOfEndOfMonthBefore === 6) break;

			weeks[0].unshift({
				date: totalDateOfMonthBefore,
				isActive: false,
				isBefore: true,
				isAfter: false,
			});
		}

		for (let i = 1; i <= __utils__.__endDate; i++) {
			const firstWeek = {
				start: __utils__.__startDate,
				end:
					__utils__.__totalWeekday -
					__utils__.__startDay +
					__utils__.__startDate,
			};
			const secondWeek = {
				start: firstWeek.end + 1,
				end: firstWeek.end + 7,
			};
			const thirdWeek = {
				start: secondWeek.end + 1,
				end: secondWeek.end + 7,
			};
			const fourthWeek = {
				start: thirdWeek.end + 1,
				end: thirdWeek.end + 7,
			};

			const x = i === current._date && current._year === dayjs().year() ? true : false;

			const temp = {
				date: i,
				isActive: x,
				isBefore: false,
				isAfter: false,
			};

			if (temp.isActive) {
				if (temp.date <= firstWeek.end) {
					weeks.current = 1;
				} else if (temp.date <= secondWeek.end) {
					weeks.current = 2;
				} else if (temp.date <= thirdWeek.end) {
					weeks.current = 3;
				} else if (temp.date <= fourthWeek.end) {
					weeks.current = 2;
				} else {
					weeks.current = 5;
				}
			}

			if (i >= firstWeek.start && i <= firstWeek.end) {
				weeks[0].push(temp);
			} else if (i >= secondWeek.start && i <= secondWeek.end) {
				weeks[1].push(temp);
			} else if (i >= thirdWeek.start && i <= thirdWeek.end) {
				weeks[2].push(temp);
			} else if (i >= fourthWeek.start && i <= fourthWeek.end) {
				weeks[3].push(temp);
			} else {
				weeks[4].push(temp);
			}
		}

		// adding some date from next month that still in a row
		for (
			let startDateOfMonthAfter = __utils__.__monthAfter.date(1).date(),
				startDayPosOfMonthAfter = __utils__.__monthAfter.date(1).day();
			startDayPosOfMonthAfter <= 6;
			startDateOfMonthAfter++, startDayPosOfMonthAfter++
		) {
			if (startDayPosOfMonthAfter === 0) break;
			weeks[4].push({
				date: startDateOfMonthAfter,
				isNow: false,
				isBefore: false,
				isAfter: true,
			});
		}

		return weeks;
	}

	function render(date){
		const { current, ...rest } = getWeeks(date);

		setWeek(() => current);
		setDateByWeek(() => rest);
	}

	return { week, setWeek, dates: dateByWeek, setDates: setDateByWeek, setUseWeek: render };
}

function useCalendar(date = __defaults.date) {
	const [state, dispatch] = useReducer(reducer, { date });
	const { week, dates, setWeek, setDates, setUseWeek } = useWeek();

	const onCalendarChange = (type, payload) => {
		switch (type) {
			case CHANGE_YEAR:
				dispatch({ type: CHANGE_YEAR, payload });
				break;
			case CHANGE_MONTH:
				dispatch({type: CHANGE_MONTH, payload });
				break;
			case CHANGE_DATE:
				dispatch({type: CHANGE_DATE, payload });
				break;

			default:
				throw new Error('Invalid param, either type or payload');
		}
	};

	useEffect(() => {
		setUseWeek(state.date)
	}, [state.date])


	return {
		current: state.date,
		week,
		dates,
		setWeek,
		setDates,

		onCalendarChange,
	};
}

export default useCalendar;
