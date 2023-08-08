import {createSlice} from '@reduxjs/toolkit'
import appApi from "./appApi";

const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers:{
        setProducts: (_, action)=>{
            return  action.payload.data
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.productCreation.matchFulfilled, (state,action)=> action.payload)
        builder.addMatcher(appApi.endpoints.productEdit.matchFulfilled, (state,action)=> action.payload)
        builder.addMatcher(appApi.endpoints.productDeletion.matchFulfilled, (state,action)=> action.payload)

    }

})

const { actions, reducer } = productSlice;
export const { setProducts } =  actions;
export default reducer;