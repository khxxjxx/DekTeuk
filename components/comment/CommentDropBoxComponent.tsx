import React, { useRef, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@firebase/firebase';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootReducer } from '@store/reducer';

type CommentDropBoxProps = {
  setNestedReply?: (v: boolean) => void;
  setMenu(v: boolean): void;
  setModify(v: boolean): void;
  commentId: string;
  userId: string;
  isNested: boolean;
};

const open = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -7%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;

const CommentDropBoxDiv = styled.div`
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  width: 100px;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 20px;
  animation: ${open} 0.2s ease;
  @media (prefers-color-scheme: dark) {
    background-color: #1c1c1e;
  }
`;

const CommentDropBoxOption = styled.div`
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #e6e6e6;
    color: black;
  }
`;

const CommentDropBox: React.FC<CommentDropBoxProps> = ({
  setNestedReply,
  setMenu,
  setModify,
  commentId,
  userId,
  isNested,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const userLoginInfo = useSelector((state: RootReducer) => state.user.user.id);
  const deleteComment = async () => {
    const commentref = doc(db, 'comment', commentId);
    await updateDoc(commentref, {
      isDeleted: true,
    });
  };
  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node))
      setMenu(false);
  };

  return (
    <CommentDropBoxDiv ref={menuRef}>
      {isNested && (
        <CommentDropBoxOption
          onClick={() => {
            if (setNestedReply) setNestedReply(true);

            setMenu(false);
          }}
        >
          답글 달기
        </CommentDropBoxOption>
      )}

      {userId == userLoginInfo && (
        <>
          <CommentDropBoxOption
            onClick={() => {
              setModify(true);
              setMenu(false);
            }}
          >
            수정하기
          </CommentDropBoxOption>
          <CommentDropBoxOption
            onClick={() => {
              deleteComment();
              setMenu(false);
            }}
          >
            삭제하기
          </CommentDropBoxOption>
        </>
      )}
    </CommentDropBoxDiv>
  );
};

export default CommentDropBox;
