import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import wrapper from 'store/configureStore';
import { getUser } from 'store/reducer';
// import { ThemeProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = {
  palette: { mode: 'light' },
  // colors: { fixedMenuBackgroundColor: '#8946A6' },
  colors: {
    HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
    // HeaderBackgroundColor: '#8946A6',
  },
  mode: { primary: 'black' },
};

const theme_ = createTheme(
  {},
  {
    customTheme: {
      defaultMode: {
        headerMenuBackgroundColor: '#8946A6',
        headerBackgroundColor: '#8946A6',
        inCardRoungeColor: '#4C78C1',
        // inCardRoungeColor: '#4C78C1',
        // inCardRoungeColor: '#4C78C1',
        // inCardRoungeColor: '#4C78C1',
      },
      darkMode: {
        headerMenuBackgroundColor: '#8946A6',
        headerBackgroundColor: '#8946A6',
        inCardRoungeColor: '#4C78C1',
        // inCardRoungeColor: '#4C78C1',
        // inCardRoungeColor: '#4C78C1',
        // inCardRoungeColor: '#4C78C1',
      },
    },
  },
);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme_}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }: AppContext): Promise<any> => {
      await store.dispatch(getUser());
    },
);

export default wrapper.withRedux(MyApp);
