import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  following: [],
  status: null,
  error: null
}

export const fetchFollowing = createAsyncThunk(
  'following/fetchFollowing',
  async (info) => {
    try {
      const {data: following} = await axios.get('/api/user/following', {params: {info}})
      return following
    } catch (err) {
      console.log(err)
    }
  }
)

export const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFollowing.pending]: (state) => {
      state.status = "loading";
    },
    [fetchFollowing.fulfilled]: (state, action) => {
      state.following = action.payload;
      state.status = "success";
    },
    [fetchFollowing.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  }
})

export const followingReducer = followingSlice.reducer
