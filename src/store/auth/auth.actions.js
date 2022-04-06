import { createAsyncThunk } from "@reduxjs/toolkit";

import jwtDecode from "jwt-decode";

import http from "../../http-common";
import Auth from "../../utils/lib/auth.lib";
import AuthServices from "./auth.services";

export const loginThunk = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
	try {
		const { saved, ...values } = data;

		const {
			data: { token },
		} = await AuthServices.login(values);

		http.defaults.headers.common["Authorization"] = `Bearer ${token}`;

		saved ? Auth.setToken(token) : null;

		const value = jwtDecode(token);

		return value;
	} catch (err) {
		return rejectWithValue(err.toString());
	}
});

export const registerThunk = createAsyncThunk("auth/register", async(data, {rejectWithValue}) => {
	try{
		await AuthServices.register(data);
		return;
	}catch(err){
		return rejectWithValue(err.toString());
	}
})