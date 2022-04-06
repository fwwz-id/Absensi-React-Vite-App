import axios from "axios";

import { url, ver } from "./utils/constants/api.const";

const props = {
	baseURL: `${url}/${ver}`,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true,
};

export default axios.create({...props});