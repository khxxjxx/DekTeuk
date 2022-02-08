import { HYDRATE } from 'next-redux-wrapper';
const initialState = {
  //dummy data
  products: [
    { id: '1', name: 'chew toy', price: 55 },
    { id: '2', name: 'vest', price: 80 },
    { id: '3', name: 'leash', price: 60 },
  ],
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
  }
  return state;
};
export default reducer;
