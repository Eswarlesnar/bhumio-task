import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], 
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    deleteRows: (state, action) => {
      const rowIds = action.payload;
      state.data = state.data.filter((item) => !rowIds.includes(item.id));
    },
    updateRows: (state, action) => {
      const {rows , updatedRowIds} = action.payload;
      console.log(action.payload)
      for(let i=0 ; i< updatedRowIds.length ; i++){
        let id = updatedRowIds[i]
        let indexOfmatchId = state.data.findIndex(item => item.id === id)
        state.data[indexOfmatchId] = rows[i]
      }
    },
    importData: (state, action) => {
      const importedData = action.payload;
      state.data = importedData;
    },
  },
});

export const { deleteRows, updateRows, importData } = dataSlice.actions;
export default dataSlice.reducer;