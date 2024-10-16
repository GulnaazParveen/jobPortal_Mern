import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
    employer: JSON.parse(localStorage.getItem("employer")) || null, 
    token:localStorage.getItem("token") || null
}

const employerSlice=createSlice({
    name:'employer',
    initialState,
    reducers:{
        loginSuccessEmployer:(state,action)=>{
          state.employer = action.payload.employerData;
            state.token = action.payload.token;
        },
        logoutSuccessEmployer:(state,action)=>{
            state.employer=null;
            state.token = null;
        }
    }

})

export const { loginSuccessEmployer, logoutSuccessEmployer } = employerSlice.actions;


export const LoginEmployer= (loginData) => async (dispatch) => {
 try{

       const response = await axios.post(
         "http://localhost:8000/api/v1/employers/loginEmployer",
         loginData,
         {
           headers: { "Content-Type": "application/json" },
           withCredentials: true,
         }
       );

       console.log("login successfully",response);
       
       const employerData=response.data.data.loggedEmployer
       console.log("employer data",employerData);
       
      const token = response.data.data.accessToken;
        
      //  give data to action
     dispatch(loginSuccessEmployer({ employerData, token }));

       localStorage.setItem("employer",JSON.stringify(employerData))
       localStorage.setItem("token",token)
 }catch(error){
  
 }

}
export const logoutEmployer= () => (dispatch) => {
  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("employer");

  dispatch(logoutSuccessEmployer());
};
export default employerSlice.reducer