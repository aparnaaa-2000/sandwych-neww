import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    ICDCode :'',
    PrescriptionID:'',
    DrugID : [],
    MedID : []
};

const StoreMedSlice = createSlice({
    name: 'value',
    initialState,
    reducers: {
      setICDCOde: (state, action) => {
        state.ICDCode = action.payload;
      },
      
      setPrescriptionID:(state,action) =>{
        state.PrescriptionID = action.payload;
      },

      setDrugID : (state,action) =>{
        state.DrugID =  action.payload;
      },
      
      setMedID : (state,action) =>{
        state.MedID = action.payload
      }
  
    },
  });
  
  export const {setICDCOde ,  setPrescriptionID ,setDrugID,setMedID} = StoreMedSlice.actions;
  export default StoreMedSlice.reducer;
  