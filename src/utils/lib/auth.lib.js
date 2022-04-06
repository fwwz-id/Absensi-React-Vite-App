import jwtDecode from "jwt-decode";

class Auth {
	getToken() {
		return localStorage.getItem("user");
	}

	setToken(token) {
		return localStorage.setItem("user", JSON.stringify(token));
	}

	checkIsTokenValid() {
		if (!!this.getToken()) {
			const { auth } = jwtDecode(this.getToken());
            return auth
		}

        return null;
	}
}

export default new Auth();
