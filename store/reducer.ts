import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyInfo } from '@utils/function';
import { SearchResult, UserState, ViewPosts } from '@interface/StoreInterface';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@firebase/firebase';
import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RoungePost, TopicPost } from '@interface/CardInterface';
const initialUserState: UserState = {
  user: {
    nickname: '',
    jobSector: '',
    validRounges: [{ title: '토픽', url: 'topic' }],
    id: '',
    hasNewNotification: false,
    hasNewChatNotification: false,
    posts: [],
    email: '',
  },
  status: 'standby',
  error: '',
};

export const getUser = createAsyncThunk('getUser', async (result: any) => {
  return await result;
});

export const setTempDataInitializing = createAsyncThunk(
  'setTempDataInitializing',
  async (result: any) => {
    return await result;
  },
);

// export const getUser = createAsyncThunk('getUser', async (result: any) => {
//   return await getMyInfo(result);
// });
// console.log(getUser.name);
export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setNewUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setMyInfo: (state, action) => {
      state.user = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialUserState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
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

const getPostAndIndex = (viewState: Array<SearchResult>, postId: string) => {
  for (let i = 0; i < viewState.length; i++) {
    for (let j = 0; j < viewState[i].result.length; j++) {
      if (viewState[i].result[j].postId === postId) {
        return { viewPage: viewState[i].result, index: j };
      }
    }
  }
  return { viewPage: null, index: -1 };
};

const view = createSlice({
  name: 'view',
  initialState: { view: <any>[], searchValue: '' },
  reducers: {
    initialViewPosts(state, action) {
      state.view = [action.payload];
    },
    setViewPosts(state, action) {
      state.view.push(action.payload);
    },
    resetViewPosts(state) {
      state.view = [];
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    addViewPost(state, action) {
      state.view.unshift(action.payload);
    },
    likeViewPost(
      state,
      action: { payload: { postId: string; userId: string } },
    ) {
      const { viewPage, index } = getPostAndIndex(
        state.view,
        action.payload.postId,
      );
      if (viewPage) {
        viewPage[index].pressPerson.push(action.payload.userId);
        viewPage[index].likeCount++;
      }
    },
    unLikeViewPost(
      state,
      action: { payload: { postId: string; userId: string } },
    ) {
      const { viewPage, index } = getPostAndIndex(
        state.view,
        action.payload.postId,
      );
      if (viewPage) {
        viewPage[index].pressPerson = viewPage[index].pressPerson.filter(
          (id: string) => id !== action.payload.userId,
        );
        viewPage[index].likeCount--;
      }
    },
    updateOnePost(
      state,
      action: { payload: { postId: string; postData: TopicPost | RoungePost } },
    ) {
      const { viewPage, index } = getPostAndIndex(
        state.view,
        action.payload.postId,
      );
      if (viewPage) {
        viewPage[index] = {
          ...viewPage[index],
          ...action.payload.postData,
        };
      }
    },
    deleteOnePost(state, action: { payload: { postId: string } }) {
      const { viewPage, index } = getPostAndIndex(
        state.view,
        action.payload.postId,
      );
      if (viewPage) {
        viewPage.splice(index, 1);
      }
    },
  },
});

const scroll = createSlice({
  name: 'scroll',
  initialState: { scrollY: 0 },
  reducers: {
    setScroll(state, action) {
      state.scrollY = action.payload;
    },
  },
});

// 임시
const tempData = createSlice({
  name: 'tempData',
  initialState: { tempData: { data: <any>[], key: '', status: '' } },
  reducers: {
    setData(state, action) {
      state.tempData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTempDataInitializing.fulfilled, (state, action) => {
      state.tempData = action.payload;
    });
  },
});

export const setDataAction = tempData.actions.setData; // 임시

export const setViewAction = view.actions.setViewPosts;
export const resetViewAction = view.actions.resetViewPosts;
export const initialViewAction = view.actions.initialViewPosts;
export const setSearchValueAction = view.actions.setSearchValue;
export const setScrollAction = scroll.actions.setScroll;
export const setMyInfoAction = userSlice.actions.setMyInfo;
export const likeViewPostAction = view.actions.likeViewPost;
export const unLikeViewPostAction = view.actions.unLikeViewPost;
export const updateOnePostAction = view.actions.updateOnePost;
export const deleteOnePostAction = view.actions.deleteOnePost;
const rootReducer = (
  state: {
    user: UserState;
    view: ViewPosts;
    scroll: { scrollY: number };
    tempData: any;
  },
  action: AnyAction,
) => {
  {
    switch (action.type) {
      case HYDRATE:
        let userState: UserState = {
          user: {
            nickname: '',
            jobSector: '',
            validRounges: [],
            id: '',
            hasNewNotification: false,
            hasNewChatNotification: false,
            posts: [],
            email: '',
          },
          status: 'standby',
          error: '',
        };

        if (action.payload.user.user.nickname) userState = action.payload.user;
        else userState = state.user;
        if (state.view.view.length === 0) {
          return {
            ...action.payload,
            view:
              state.view.searchValue && action.payload.view.searchValue
                ? { view: [], searchValue: '' }
                : state.view,
            user: userState,
            tempData:
              action.payload.tempData.tempData.key != '' &&
              state.tempData.key == action.payload.tempData.tempData.key
                ? action.payload.tempData
                : state.tempData,
          };
        } else
          return {
            user: userState,
            view:
              state.view.searchValue && action.payload.view.searchValue
                ? { view: [], searchValue: '' }
                : state.view,
            scroll: { scrollY: state.scroll.scrollY },
            tempData:
              action.payload.tempData.tempData.key != '' &&
              state.tempData.key == action.payload.tempData.tempData.key
                ? action.payload.tempData
                : state.tempData,
          };
      default:
        const combineReducer = combineReducers({
          user: userSlice.reducer,
          view: view.reducer,
          scroll: scroll.reducer,
          tempData: tempData.reducer,
        });
        return combineReducer(state, action);
    }
  }
};

export const setNewUserInfo = userSlice.actions.setNewUserInfo;
export const reset = userSlice.actions.reset;
export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
