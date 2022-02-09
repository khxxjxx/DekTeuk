import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { AuthProvider } from './user/auth';
import { firebaseAdmin } from '@firebase/firebaseAdmin';
import nookies from 'nookies';
import fetch from 'isomorphic-unfetch';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  //   console.log('=============================');
  //   // //const cookie = nookies.get(ctx);
  //   // //console.log('cookies', cookie.token);
  //   console.log('token', ctx.req.cookies.token);
  //   const token = await firebaseAdmin.auth().verifyIdToken(ctx.req.cookies.token);
  //   // // console.log(token);
  const { ctx } = appContext;
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  //const appProps = await App.getInitialProps(appContext);

  // only run on server-side, user should be auth'd if on client-side
  //if (typeof window === 'undefined') {
  const { token } = nookies.get(ctx);
  // console.log('token', token);

  // if a token was found, try to do SSA
  if (token) {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({
          token: token,
        }),
      };
      // const result = await fetch('http://localhost:3000/api/validate', {
      //   headers,
      // });
      const result = await fetch('http://localhost:3000/api/validate', {
        headers,
      }).then((res) => res.json());
      // console.log('result', result);
      console.log('result', result);
    } catch (e) {
      // let exceptions fail silently
      // could be invalid token, just let client-side deal with that
    }
  }

  return { pageProps: {} };
};

export default MyApp;
