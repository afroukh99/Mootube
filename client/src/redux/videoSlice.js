import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentVideo: null,
  loading: false,
  error: false
}
const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },

    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    likeAction: (state, action) => {
      if (!state.currentVideo.like?.includes(action.payload)) {
        state.currentVideo.like.push(action.payload)
        state.currentVideo.dislike.splice(state.currentVideo.dislike.indexOf(action.payload), 1)
      }
    },

    dislikeAction: (state, action) => {
      if (!state.currentVideo.dislike?.includes(action.payload)) {
        state.currentVideo.dislike.push(action.payload)
        state.currentVideo.like.splice(state.currentVideo.like.indexOf(action.payload), 1)
      }
    },
    
  }
})

export const { fetchStart, fetchSuccess, fetchFailure,likeAction,dislikeAction } = videoSlice.actions


export default videoSlice.reducer;