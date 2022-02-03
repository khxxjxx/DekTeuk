import dynamic from 'next/dynamic';

const App = dynamic(() => import('@components/Hello'), {
  ssr: false,
});
// import Hello from './Hello'
const TestIndex = () => {
  return (
    <>
      <App />
    </>
  );
};
export default TestIndex;
