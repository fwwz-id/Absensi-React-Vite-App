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
    reducers: {},
    extraReducers: {
        [disciplesThunk.pending]: (state) => {
            state.status = "loading"
        },
        [disciplesThunk.fulfilled]: (state, payload) => {
            const { payload: data } = payload
            state.status = "loaded"
            state.data.push(...data)
        },[disciplesThunk.rejected]: (state) => {
            state.status = "rejected";
        }
    }
})

const { actions, reducer } = discipleSlice;
export default reducer