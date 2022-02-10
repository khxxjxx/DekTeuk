import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyInfo } from '@utils/function';
import { UserState, ViewPosts } from '@interface/StoreInterface';

const initialUserState: UserState = {
  user: {
    nickname: '',
    jobSector: '',
    validRounges: [],
    myChattings: [],
    hasNewNotification: false,
  },
  status: 'standby',
  error: '',
};

export const getUser = createAsyncThunk('getUser', async () => {
  return await getMyInfo();
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export const view = createSlice({
  name: 'view',
  initialState: { view: <any>[] },
  reducers: {
    initialViewPosts(state, action) {
      state.view = [action.payload];
    },
    setViewPosts(state, action) {
      state.view = [...state.view, action.payload];
    },
    resetViewPosts(state) {
      state.view = [];
    },
  },
});
export const scroll = createSlice({
  name: 'scroll',
  initialState: { scrollY: 0 },
  reducers: {
    setScroll(state, action) {
      state.scrollY = action.payload;
    },
  },
});
export const setViewAction = view.actions.setViewPosts;
export const resetViewAction = view.actions.resetViewPosts;
export const initialViewAction = view.actions.initialViewPosts;
export const setScrollAction = scroll.actions.setScroll;
const rootReducer = (
  state: {
    user: UserState;
    view: ViewPosts;
    scroll: { scrollY: number };
  },
  action: AnyAction,
) => {
  {
    switch (action.type) {
      case HYDRATE:
        if (state.view.view.length === 0) {
          return action.payload;
        } else
          return {
            user: action.payload.user,
            view: { view: [...state.view.view] },
            scroll: { scrollY: state.scroll.scrollY },
          };
      default:
        const combineReducer = combineReducers({
          user: userSlice.reducer,
          view: view.reducer,
          scroll: scroll.reducer,
        });
        return combineReducer(state, action);
    }
  }
};

export default rootReducer;
