import '../styles/globals.css';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import {
  configureStore,
  createSlice,
  createAsyncThunk,
  Store,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { getMyInfo } from '@utils/function';
//@ts-ignore
import { UserState } from '@interface';
import wrapper from 'store/configureStore';
import { getUser, userSlice } from 'store/reducer';

// const initialUserState: UserState = {
//   user: {
//     nickname: '',
//     jobSector: '',
//     validRounges: [],
//     myChattings: [],
//     hasNewNotification: false,
//   },
//   status: 'standby',
// };
// export const getUser = createAsyncThunk('getUser', async () => {
//   return await getMyInfo();
// });
// const userSlice = createSlice({
//   name: 'user',
//   initialState: initialUserState,
//   reducers: {},
//   extraReducers: {
//     [getUser.pending as any]: (state: UserState, action: any) => {
//       state.status = 'loading';
//     },
//     [getUser.fulfilled as any]: (state: UserState, action: any) => {
//       console.log(action.payload);
//       state.user = action.payload;
//       state.status = 'success';
//     },
//     [getUser.rejected as any]: (state: UserState, action: any) => {
//       state.status = 'error';
//     },
//   },
// });
// const store = configureStore({ reducer: userSlice.reducer });
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }): Promise<any> => {
      // console.log(req.cookies);
      // await store.dispatch(getUser());
    },
);
// MyApp.getInitialProps = wrapper.getInitialAppProps(async () => {
//   console.log('@@@@@@@@');
//   // console.log(ctx);
//   console.log('@@@@@@@@');
//   return wrapper.withRedux(MyApp);
// });
// MyApp.getInitialProps = async ({
//   Component,
//   ctx,
// }: AppContext): Promise<AppInitialProps> => {
//   // console.log(Component);
//   console.log('@@@@@@@@@@@@');
//   console.log(ctx.store);
//   console.log('@@@@@@@@@@@@');

//   return await getMyInfo();
// };

export default wrapper.withRedux(MyApp);
// export default MyApp;
