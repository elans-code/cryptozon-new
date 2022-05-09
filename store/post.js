import axios from "axios";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    post:[],
}

export const fetchAllPost = createAsyncThunk(
    'post/fetchPost',
    async () => {
        try {
            const {data:postData} = await axios.get('/api/post');
            return postData;
        } catch (error) {
            console.log(error)
        }
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{},
    extraReducers: {
        [fetchAllPost.pending]: (state) => {
          state.status = "loading";
        },
        [fetchAllPost.fulfilled]: (state, action) => {
          state.AllPost = action.payload;
          state.status = "success";
        },
        [fetchAllPost.rejected]: (state, action) => {
          state.status = "rejected";
          state.error = action.payload;
        }
      }
})

export const postReducer = postSlice.reducer;