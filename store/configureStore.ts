import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const wrapper = createWrapper(
  () =>
    configureStore<any>({
      reducer,
      devTools: process.env.NODE_ENV !== 'production',
    }),
  {
    debug: process.env.NODE_ENV !== 'production',
  },
);

export default wrapper;
