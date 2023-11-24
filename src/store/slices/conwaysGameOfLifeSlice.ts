import { createSlice } from '@reduxjs/toolkit';
import { IBoardDimensions, Point, Rectangle, range } from '../../Utils/Util';



const initialState = { 
    boardDimensions: {}
};

export const conwaysSlice = createSlice({
    name: 'conways',
    initialState,
    reducers: {
    },
  });
  
  export default conwaysSlice.reducer
