import dayjs from "dayjs";

const days = {
	short: dayjs.weekdaysMin(),
	long: dayjs.weekdays(),
};

const months = {
	short: dayjs.monthsShort(),
	long: dayjs.months(),
};

export {days, months};