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
export const likePost = createAsyncThunk(
  'post/likePost',
  async (postId, {dispatch}) => {
      try {
        const {data:prevPostData} = await axios.get(`/api/post/${postId}`);
        const {data} = await axios.patch(`/api/post/${postId}`, {likes:prevPostData.likes + 1});
        const {data:postData} = await axios.get('/api/post');
        dispatch(fetchAllPost());
        return postData;
      } catch (error) {
          console.log(error)
      }
  }
)
export const likeComment = createAsyncThunk(
  'comment/likeComment',
  async (commentId, {dispatch}) => {
      try {
        const {data:prevCommentData} = await axios.get(`/api/comments/${commentId}`);
        const {data} = await axios.patch(`/api/comments/${commentId}`, {likes:prevCommentData.likes + 1});
        const {data:postData} = await axios.get('/api/post');
        dispatch(fetchAllPost());
        return postData;
      } catch (error) {
          console.log(error)
      }
  }
)

export const commentPost = createAsyncThunk(
  'comment/commentPost',
  async (newComment,{dispatch}) => {
      try {
        await axios.put('/api/comments/', newComment);
        dispatch(fetchAllPost());
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
      },
      }
})

export const postReducer = postSlice.reducer;