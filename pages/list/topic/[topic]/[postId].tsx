import { StoreState } from '@interface/StoreInterface';
import { setScrollAction } from '@store/reducer';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const {
    req: {
      headers: { referer },
    },
  } = context;
  if (referer)
    return {
      props: {
        referer: referer
          .split('/')
          .slice(3, referer.split('/').length)
          .join('/'),
        test: context.req.url,
      },
    };
  return { props: {} };
};

export default function TopicPost({
  referer,
  test,
}: {
  referer: string | undefined;
  test: string;
}) {
  const dispatch = useDispatch();
  const scrollState = useSelector((state: StoreState) => state.scroll);
  const urls = [];
  console.log(scrollState?.scrollRef);
  useEffect(() => {
    const arr = test.split('/');
    const idx = test.split('/').indexOf('list');
    const len = arr.length;
    const postId = arr.slice(idx, len)[3].split('?')[0].split('.')[0];
    if (
      !(
        referer &&
        referer.split('/').length === 2 &&
        referer.split('/')[0] === 'list'
      )
    ) {
      dispatch(setScrollAction(''));
    } else {
      dispatch(setScrollAction(postId));
    }
  }, []);
  return <div>1234123412341234123412341234123412341234</div>;
}
