import { createSlice } from "@reduxjs/toolkit";

const initialState={
    employer:null
}

const employerSlice=createSlice({
    name:'employer',
    initialState,
    reducers:{
        setEmployer:(state,action)=>{
          state.employer=action.payload
        },
        clearEmployer:(state,action)=>{
            state.employer=null
        }
    }

})

export const {setEmployer,clearEmployer}=employerSlice.actions
export default employerSlice.reducer