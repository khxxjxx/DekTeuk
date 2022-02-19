import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

const wrapper = createWrapper(
  () =>
    configureStore<any>({
      reducer,
      // devTools: process.env.NODE_ENV !== 'production',
      devTools: false,
    }),
  {
    // debug: process.env.NODE_ENV !== 'production',
    debug: false,
  },
);

export default wrapper;
