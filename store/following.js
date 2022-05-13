import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  following: [],
  status: null,
  error: null
}

export const fetchFollowing = createAsyncThunk(
  'following/fetchFollowing',
  async (username) => {
    try {
      const {data: following} = await axios.get('/api/user/following')
      return following
    } catch (err) {
      console.log(err)
    }
  }
)

// follow / unfollow
export const followUser = createAsyncThunk(
  'followers/followUser',
  async (info) => {
    const {wallet, username} = info;
    console.log('wallet is', wallet)
    console.log('username is', username)
    try {
      const {data} = axios.put('/api/user/following', {params: {wallet, username}})
      return data
    } catch(err) {
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
    [followUser.pending]: (state) => {
      state.status = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.followers = action.payload;
      state.status = "success";
    },
    [followUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  }
})
