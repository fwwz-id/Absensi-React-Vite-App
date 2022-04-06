import { createSlice } from "@reduxjs/toolkit";

import { loginThunk, registerThunk } from "./auth.actions";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		loading: "idle",
		data: {
			id: "",
			username: "",
			role: "",
		},
		message: "",
	},
	reducers: {
		loading: (state) => {
			if (state.loading === "idle")
				state.loading = "pending"
		},
		loaded: (state, action) => {
			const { payload } = action;

			state.data.id = payload.id;
			state.data.username = payload.username;
			state.data.role = payload.role;
			state.loading = "idle"
		},
	},

	extraReducers: {
		[loginThunk.pending]: (state) => {
			if (state.loading === "idle") {
				return {
					...state,
					loading: "pending",
					message: "",
				};
			}
		},
		[loginThunk.fulfilled]: (state, action) => {
			const { payload } = action;

			return {
				...state,
				data: {
					...state.data,
					id: payload.id,
					username: payload.username,
					role: payload.role,
				},
				loading: "idle",
				message: "success",
			};
		},
		[loginThunk.rejected]: (state, action) => {
			return {
				...state,
				loading: "rejected",
				message: action.payload,
			};
		},
		[registerThunk.pending]: (state) => {
			return {
				...state,
				loading: "pending",
				message: "",
			};
		},
		[registerThunk.fulfilled]: (state) => {
			return {
				...state,
				loading: "idle",
				message: "success",
			};
		},
		[registerThunk.rejected]: (state) => {
			return {
				...state,
				loading: "idle",
				message: "error",
			};
		},
	},
});

const { actions, reducer } = authSlice;
export const { loading, loaded } = actions;
export default reducer;
