import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useCalendar, { CHANGE_DATE, CHANGE_MONTH, CHANGE_YEAR } from "../../hooks/useCalendar";

import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import http from "../../http-common";

import { loading, loaded } from "../../store/auth/auth.slice";
import { disciplesThunk } from "../../store/data/disciples/disciples.slice";
import Auth from "../../utils/lib/auth.lib";

// components
// import Sidebar from "./components/sidebar";

// icons
import { BiChevronRight, BiChevronLeft, BiUser } from "react-icons/bi";

// --> responses examples
import discipleRes from "./__responses__/disciple-response.json";

import "./style.css";

const days = {
	short: dayjs.weekdaysMin(),
	long: dayjs.weekdays(),
};

const months = {
	short: dayjs.monthsShort(),
	long: dayjs.months(),
};

export default function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { auth, disciples } = useSelector(state => state);
	const { current, week, dates, setWeek, onCalendarChange } = useCalendar();

	const handlePrevWeek = useCallback(() => {
		return week > 1 ? setWeek((prev) => prev - 1) : null;
	}, [week]);

	const handleNextWeek = useCallback(() => {
		return week <= 4 ? setWeek((prev) => prev + 1) : null;
	}, [week]);

	useEffect(() => {
		const user = Auth.getToken();

		dispatch(loading());

		if (user) {
			http.defaults.headers.common['Authorization'] = `Bearer ${user}`
			let _user = jwtDecode(user);
			dispatch(loaded(_user));
		} else {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		const { id } = auth.data;
		const date = `${current.years}-${current.months.length > 1 ? current.months : `0${current.months}`}-${current.date.length > 1 ? current.date : `0${current.date}`}`;

		dispatch(disciplesThunk({id, date}))

	}, [auth])

	return (
		<>
			<div className="w-full">
				<div className="shadow-md w-fit p-1 rounded-tr-xl rounded-br-xl bg-fuchsia-500 cursor-pointer">
					<BiChevronRight className="text-3xl text-white" />
				</div>
			</div>

			{/* <Sidebar /> */}

			<div className="px-6">
				<header className="flex flex-wrap items-center justify-between py-2 space-y-2 sm:space-y-0">
					<div className="space-y-2">
						<p className="font-bold text-3xl">{days.long[0]}</p>
						<p className="text-secondary text-xs sm:text-sm md:text-base lg:text-lg">
							Welcome{" "}
							<span className="font-bold">
								Briyan Fajar Syahputra
							</span>
						</p>
					</div>
					<div>
						<div
							className="p-6 bg-sky-500 rounded-full"
							onClick={() => onChangeYears(2021)}>
							<BiUser className="text-white text-xl" />
						</div>
					</div>
				</header>

				<div className="mt-4 space-y-2">
					<div className="space-y-2">
						<p className="text-xs sm:text-sm text-secondary">{`${
							current.date
						} ${months.short[current.months]} ${current.years}`}</p>
						<div className="flex items-center justify-between">
							<p className="font-bold text-xl">Week {week}</p>
							<div className="flex space-x-2">
								<button
									className={`${
										week === 1
											? "bg-zinc-100"
											: "bg-sky-500 text-white"
									} rounded text-2xl cursor-pointer disable-on-white-surface`}
									onClick={() => handlePrevWeek()} disabled={week === 1}>
									<BiChevronLeft />
								</button>
								<button
									className={`${
										week === 5
											? "bg-zinc-100"
											: "bg-sky-500 text-white"
									} rounded text-2xl cursor-pointer disable-on-white-surface`}
									onClick={() => handleNextWeek()} disabled={week === 5}>
									<BiChevronRight />
								</button>
							</div>
						</div>
					</div>

					<div className="relative grid grid-cols-7 gap-2">
						{dates[week - 1].map(
							({ date, isActive, isBefore, isAfter }, i) => (
								<div key={i} className="date-wrapper">
									<div
										onClick={() => onCalendarChange(CHANGE_DATE, date)}
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
							<p
								className="text-center font-bold text-sm"
								key={i}>
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

					<div className="grid grid-cols-2 gap-4 justify-items-center">
						<button className="btn w-full btn-primary rounded">
							Morning
						</button>
						<button className="btn w-full rounded">Evening</button>
					</div>
				</div>

				<div className="mt-10 grid gap-4">
					{
						disciples.status === "loaded" && disciples.data.length > 0 && disciples.data.map(({id, username}) => (
							<div key={id} className="card">
								<p className="card-content">{username}</p>
								<div className="p-2 bg-emerald-500 inline-block rounded-full" />
							</div>

						))
					}
				</div>
			</div>
		</>
	);
}
