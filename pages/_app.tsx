import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
  dehydrate,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRef } from 'react';
import { getMyInfo } from '@utils/function';
const queryClient = new QueryClient();
function MyApp({ Component, pageProps, router }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false },
      },
    });
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position="top-right" />
      </Hydrate>
    </QueryClientProvider>
  );
}
MyApp.getInitialProps = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });
  await queryClient.prefetchQuery('user', getMyInfo);

  return {
    pageProps: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
export default MyApp;
