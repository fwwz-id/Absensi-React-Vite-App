import dayjs from "dayjs";
import weekdays from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import toObject from "dayjs/plugin/toObject";
import objectSupport from "dayjs/plugin/objectSupport";
import "dayjs/locale/id";

dayjs.locale("id");
dayjs.extend(localeData);
dayjs.extend(weekdays);
dayjs.extend(toObject);
dayjs.extend(objectSupport);