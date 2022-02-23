import React, { useEffect, useState } from 'react';
import Comment from './CommentComponent';
import styled from '@emotion/styled';
import { onSnapshot } from 'firebase/firestore';
import { commentQuery } from '@firebase/firebase';
import { PostData, CommentData } from '@interface/comment';

const CommentListDiv = styled.div`
  width: 100%;
`;

type CommentListProps = {
  setSum(s: number): void;
  postData: PostData;
  userId?: string;
};

const CommentList: React.FC<CommentListProps> = ({
  setSum,
  postData,
  userId,
}) => {
  const [comments, setComments] = useState<Array<CommentData>>([]); // todo: 타입 지정

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unSubscribe = onSnapshot(commentQuery(postData.id), (snapshot) => {
      const newData: any = snapshot.docs.map((value) => ({
        id: value.id,
        ...value.data(),
      }));
      setComments(newData);
      setSum(newData.length);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const isClicked = (arr: Array<string>) =>
    arr.indexOf(userId as string) === -1 ? false : true; // todo: 타입 지정

  if (loading) {
    return <div style={{ marginBottom: '20px' }}>댓글을 불러오는 중...</div>;
  }

  return (
    <CommentListDiv>
      {comments.length == 0 ? (
        <div style={{ marginBottom: '20px' }}>등록된 댓글이 없습니다.</div>
      ) : (
        comments.map((data: CommentData) => {
          // todo: 타입 지정
          return (
            <Comment
              key={data.id}
              text={data.text}
              likes={data.likes}
              nickname={data.nickname}
              job={data.job}
              date={data.createdAt}
              isClicked={isClicked(data.pressedPerson)}
              commentId={data.id}
              isNested={data.origin}
              bundleId={data.bundleId}
              isDeleted={data.isDeleted}
              postData={postData}
              userId={data.userId}
            />
          );
        })
      )}
    </CommentListDiv>
  );
};

export default CommentList;
