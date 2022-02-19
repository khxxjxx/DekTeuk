import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyInfo } from '@utils/function';
import {
  SearchResult,
  UserState,
  ViewPosts,
  ViewSwiperData,
  ViewSwiperScroll,
} from '@interface/StoreInterface';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@firebase/firebase';
import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { RoungePost, TopicPost } from '@interface/CardInterface';
import { HomeListUrlString } from '@interface/GetPostsInterface';
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
const viewSwiperScroll = createSlice({
  name: 'viewSwiperScroll',
  initialState: <Array<ViewSwiperScroll>>[],
  reducers: {
    initialViewSwiperScroll: (
      state,
      action: { payload: { key: HomeListUrlString } },
    ) => {
      const { key } = action.payload;
      state.push({ key, scroll: 0 });
    },
    setViewSwiperScroll: (
      state,
      action: { payload: { key: HomeListUrlString; scroll: number } },
    ) => {
      const { key, scroll } = action.payload;
      const target = state.find((v) => v.key === key);
      if (target?.key) target.scroll = scroll;
    },
  },
});

const getViewPageAndIndex = (viewWindow: Array<SearchResult>, id: string) => {
  for (let i = 0; i < viewWindow.length; i++) {
    for (let j = 0; j < viewWindow[i].result.length; j++) {
      if (viewWindow[i].result[j].postId === id) {
        return { targetViewPage: viewWindow[i].result, index: j };
      }
    }
  }
  return { targetViewPage: null, index: -1 };
};

const viewSwiper = createSlice({
  name: 'viewSwiper',
  initialState: <Array<ViewSwiperData>>[],
  reducers: {
    // [
    //   {
    //     key: 'timeline',
    //     data: [
    //       { result: [{}, {}, {}, {}, {}], nextPage: 1 },
    //       { result: [{}, {}, {}, {}, {}], nextPage: 2 },
    //     ],
    //   },
    //   {
    //     key: 'topic',
    //     data: [
    //       { result: [{}, {}, {}, {}, {}], nextPage: 1 },
    //       { result: [{}, {}, {}, {}, {}], nextPage: 2 },
    //     ],
    //   },
    // ];
    addViewWindow: (
      state,
      action: { payload: { key: HomeListUrlString; addData: SearchResult } },
    ) => {
      const { key, addData } = action.payload;
      state.push({ key, data: [addData] });
    },
    addViewData: (
      state,
      action: { payload: { key: HomeListUrlString; addData: SearchResult } },
    ) => {
      const { key, addData } = action.payload;
      const targetViewWindow = state.find(
        (viewWindow) => viewWindow.key === key,
      );
      targetViewWindow?.data.push(addData);
    },
    updateOneViewData: (
      state,
      action: {
        payload: {
          key: HomeListUrlString;
          oneViewData: TopicPost | RoungePost;
          oneViewId: string;
        };
      },
    ) => {
      const { key, oneViewData, oneViewId } = action.payload;
      const targetViewWindow = state.find(
        (viewWindow) => viewWindow.key === key,
      );
      if (targetViewWindow?.data) {
        const { targetViewPage, index } = getViewPageAndIndex(
          targetViewWindow.data,
          oneViewId,
        );
        if (targetViewPage && targetViewPage.length > 0 && index !== -1) {
          targetViewPage[index] = {
            ...targetViewPage[index],
            ...oneViewData,
          };
        }
      }
    },
    deleteOneViewData: (
      state,
      action: { payload: { key: HomeListUrlString; oneViewId: string } },
    ) => {
      const { key, oneViewId } = action.payload;
      const targetViewWindow = state.find(
        (viewWindow) => viewWindow.key === key,
      );
      if (targetViewWindow?.data) {
        const { targetViewPage, index } = getViewPageAndIndex(
          targetViewWindow.data,
          oneViewId,
        );
        if (targetViewPage && targetViewPage.length > 0 && index !== -1) {
          targetViewPage.splice(index, 1);
        }
      }
    },
    likeOneViewData: (
      state,
      action: {
        payload: { key: HomeListUrlString; oneViewId: string; userId: string };
      },
    ) => {
      const { key, oneViewId, userId } = action.payload;
      const targetViewWindow = state.find(
        (viewWindow) => viewWindow.key === key,
      );
      if (targetViewWindow?.data) {
        const { targetViewPage, index } = getViewPageAndIndex(
          targetViewWindow.data,
          oneViewId,
        );
        if (targetViewPage && targetViewPage.length > 0 && index !== -1) {
          const newPressPerson = Array.from(
            new Set([...targetViewPage[index].pressPerson, userId]),
          );
          targetViewPage[index].pressPerson = newPressPerson;
        }
      }
    },
    unLikeOneViewData: (
      state,
      action: {
        payload: { key: HomeListUrlString; oneViewId: string; userId: string };
      },
    ) => {
      const { key, oneViewId, userId } = action.payload;
      const targetViewWindow = state.find(
        (viewWindow) => viewWindow.key === key,
      );
      if (targetViewWindow?.data) {
        const { targetViewPage, index } = getViewPageAndIndex(
          targetViewWindow.data,
          oneViewId,
        );
        if (targetViewPage && targetViewPage.length > 0 && index !== -1) {
          targetViewPage[index].pressPerson = targetViewPage[
            index
          ].pressPerson.filter((id) => id !== userId);
        }
      }
    },
  },
});
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
export const initialViewSwiperScrollAction =
  viewSwiperScroll.actions.initialViewSwiperScroll;
export const setViewSwiperScrollAction =
  viewSwiperScroll.actions.setViewSwiperScroll;
export const addViewWindowAction = viewSwiper.actions.addViewWindow;
export const addViewDataAction = viewSwiper.actions.addViewData;
export const updateOneViewDataAction = viewSwiper.actions.updateOneViewData;
export const deleteOneViewDataAction = viewSwiper.actions.deleteOneViewData;
export const likeOneViewDataAction = viewSwiper.actions.likeOneViewData;
export const unLikeOneViewDataAction = viewSwiper.actions.unLikeOneViewData;

const rootReducer = (
  state: {
    user: UserState;
    view: ViewPosts;
    scroll: { scrollY: number };
    tempData: any;
    viewSwiperScroll: Array<ViewSwiperScroll>;
    viewSwiper: Array<ViewSwiperData>;
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
            viewSwiperScroll: state.viewSwiperScroll,
            viewSwiper: state.viewSwiper,
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
            viewSwiperScroll: state.viewSwiperScroll,
            viewSwiper: state.viewSwiper,
          };
      default:
        const combineReducer = combineReducers({
          user: userSlice.reducer,
          view: view.reducer,
          scroll: scroll.reducer,
          tempData: tempData.reducer,
          viewSwiperScroll: viewSwiperScroll.reducer,
          viewSwiper: viewSwiper.reducer,
        });
        return combineReducer(state, action);
    }
  }
};

export const setNewUserInfo = userSlice.actions.setNewUserInfo;
export const reset = userSlice.actions.reset;
export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
