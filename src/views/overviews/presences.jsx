import { Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// context
import { CalendarCTX } from "../../context/calendar.ctx";

// actions/reducers
import { SET_DESCRIPTION, SET_INFO } from "../../store/data/disciples/disciples.slice";

// components
import { Listbox } from "@headlessui/react";
import Layout from "./components/templates/layout";
import Calendar from "./components/templates/calendars";

// icons
import { BiChevronDown } from "react-icons/bi";

// styling
import "./style.css";

const options = ["alpha", "hadir", "sakit", "izin"];


function Presences() {
	const dispatch = useDispatch();
	const { disciples } = useSelector((state) => state);
	const { isMorning } = useContext(CalendarCTX);

	return (
		<Layout>
			<div className="content">
				<div className="calendar-components-wrapper">
					<Calendar />
				</div>

				<div className="mt-10 grid gap-4">
					{
						//
						disciples.status === "loaded" &&
							disciples.data.length > 0 &&
							disciples.data.map(
								({
									username,
									presences: { _id: id, morning, info },
								}) => {
									const elem = (
										<div
											key={id}
											className="relative bg-gray-300 rounded flex flex-wrap items-center justify-between p-3">
											<p className="font-bold">
												{username}
											</p>

											<Listbox
												value={info ? info : "alpha"}
												onChange={(value) =>
													dispatch(SET_INFO({id, info: value}))
												}>
												<Listbox.Button className="flex items-center bg-white rounded p-2 space-x-2">
													<span>
														{info ? info.replace(/^\w/, (c) => c.toUpperCase()) : "Kosong"}
													</span>
													<BiChevronDown />
												</Listbox.Button>
												<Listbox.Options className="absolute -right-4 bg-fuchsia-500 text-white z-50 cursor-pointer rounded">
													{options.map(
														(option, key) => (
															<Listbox.Option
																className="px-4 py-2 transition duration-150 hover:bg-fuchsia-600"
																key={key}
																value={option}
																as={Fragment}>
																<li>
																	{option.replace(/^\w/, (c) => c.toUpperCase())}
																</li>
															</Listbox.Option>
														)
													)}
												</Listbox.Options>
											</Listbox>

											<input type="text" className="w-full mt-2 p-2 text-xs md:text-base rounded border-none outline-none" placeholder="keterangan tambahan jika tidak masuk (optional)" onChange={(evt) => dispatch(SET_DESCRIPTION({id, description: evt.target.value}))}/>
										</div>
									);

									if (isMorning) {
										return morning && elem;
									} else {
										return !morning && elem;
									}
								}
							)
					}
				</div>

				<div className="mt-4 text-right">
					<button type="submit" className="btn btn-primary rounded">Save</button>
				</div>
			</div>
		</Layout>
	);
}

export default Presences;
