import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import disciplesServices from "./disciples.services";

export const disciplesThunk = createAsyncThunk("disciples/get", async ({id, date}, { rejectWithValue }) => {
    try{
        const { data } = await disciplesServices.getDisciplesPresence(id, date);
        return data
    }catch(err){
        return rejectWithValue(err.toString());
    }
}, {
    condition: (param) => {
        if(param.id === ''){
            return false
        }
    }
})

const discipleSlice = createSlice({
    name: 'disciples',
    initialState: {
        status: 'loaded',
        data: [],
    },
    reducers: {
        SET_INFO: (state, action) => {
            const { payload } = action;
            const current = state.data.filter((disciple) => disciple.presences._id === payload.id);
            current[0]["presences"]["info"] = payload.info
        },
        SET_DESCRIPTION: (state, action) => {
            const { payload } = action;
            const current = state.data.filter((disciple) => disciple.presences._id === payload.id);
            current[0]["presences"]["description"] = payload.description
        }
    },
    extraReducers: {
        [disciplesThunk.pending]: (state) => {
            state.status = "loading"
        },
        [disciplesThunk.fulfilled]: (state, payload) => {
            const { payload: data } = payload
            state.status = "loaded"
            state.data = data
        },[disciplesThunk.rejected]: (state) => {
            state.status = "rejected";
        }
    }
})

const { actions, reducer } = discipleSlice;
export const { SET_INFO, SET_DESCRIPTION } = actions;
export default reducer;