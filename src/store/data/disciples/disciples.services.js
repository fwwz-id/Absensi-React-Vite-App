import http from "../../../http-common";

class DiscipleServices {
	getDisciplesPresence(id, date) {
		return http.get(`/presence/list/${id}?date=${date}`);
	}
}

export default new DiscipleServices();
