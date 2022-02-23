import PostForm from '@components/write/PostForm';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function Write({ from }: { from: string }) {
  return (
    <>
      <PostForm from={from} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const { referer } = ctx.req.headers;
  if (referer) {
    const from = referer?.split('/')[referer?.split('/').indexOf('list') + 1];
    return { props: { from } };
  }
  return { props: { from: '' } };
};
