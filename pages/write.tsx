import PostForm from '@components/write/postForm';

export interface ChildProps {
  postsProps: any;
}

export default function Write({ postsProps }: ChildProps) {
  return (
    <>
      <PostForm />
    </>
  );
}
