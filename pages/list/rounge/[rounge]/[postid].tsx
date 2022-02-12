import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import moment from 'moment';
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
  getDocsFromServer,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '@firebase/firebase';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '@hooks/Auth';
import Comment from '@components/comment/Comment';
import type { RootReducer } from 'store/reducer';
import { useSelector } from 'react-redux';
import CustomSeparator from '@components/post/Separator';
import Moment from 'react-moment';
import 'moment/locale/ko';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { typography } from '@mui/system';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import UpdateLink from '@components/post/UpdateLink';
import DeleteLink from '../../../../components/post/DeleteLink';
import EditPostForm from '@components/write/EditPostForm';
const Detail = ({ postProps, postId }: any) => {
  const { user }: any = useSelector((state: RootReducer) => state.user);

  const [post, setPost] = useState(JSON.parse(postProps));

  //해당 게시물에 좋아요를 누른 사람의 배열과 현재 로그인한 유저의 이메일을 비교하여 판단함
  const [userLike, setUserLike] = useState(post.pressPerson.includes(user.id));
  const [postLikeCount, setPostLikeCount] = useState(post.pressPerson.length);
  const [editOpen, setEditOpen] = useState(false);
  const changeLike = async (id: any, e: any) => {
    //다른 태그에 이벤트가 전달되지 않게 하기 위함
    console.log(post);
    e.stopPropagation();
    if (userLike) {
      setUserLike(false);
      setPostLikeCount(postLikeCount - 1);
      const userDocRef = doc(db, 'posts', postId);
      //likeuser에서 현재 유저의 이메일 index를 찾아내서 제거함
      await updateDoc(userDocRef, {
        pressPerson: arrayRemove(user.id),
      });
    } else {
      setUserLike(true);
      setPostLikeCount(postLikeCount + 1);
      const userDocRef = doc(db, 'posts', postId);
      //likeuser에서 현재 유저의 이메일 index를 추가함
      await updateDoc(userDocRef, {
        pressPerson: arrayUnion(user.id),
      });
    }
  };
  //사진 추가변경시
  useEffect(() => {}, [post]);
  //작성 시간 나타내기
  const MomentDateChange = () => {
    const nowTime = Date.now(),
      startTime = new Date(post.createdAt.seconds * 1000);

    return <Moment fromNow>{startTime}</Moment>;
  };
  // console.log(moment(new Date()).fromNow());
  //수정버튼 클릭 확인

  return (
    <Container maxWidth="sm">
      {editOpen ? (
        <EditPostForm
          setEditOpen={setEditOpen}
          setPost={setPost}
          thisPostId={postId}
          postInfo={post}
        />
      ) : (
        <Box sx={{ minWidth: 120, mt: 6 }}>
          <CustomSeparator menu={post} />
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            {post.title}
          </Typography>
          <Typography
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {userLike ? (
              <FavoriteIcon
                onClick={(e) => changeLike(postId, e)}
                sx={{ mr: 1 }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={(e) => changeLike(postId, e)}
                sx={{ mr: 1 }}
              />
            )}
            {postLikeCount}
            <AccessTimeIcon sx={{ ml: 3, mr: 1 }} />
            <MomentDateChange />
            {/* <DriveFileRenameOutlineIcon sx={{ ml: 3, mr: 1 }} />
          수정하기 */}
            {post.userId === user.id ? (
              <>
                <UpdateLink
                  thisUser={user.id}
                  thisPost={postId}
                  setEditOpen={setEditOpen}
                />
                <DeleteLink
                  thisUser={user.id}
                  thisPost={postId}
                  thisPostTitle={post.title}
                />
              </>
            ) : (
              ''
            )}
          </Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Typography sx={{ mb: 2 }}>
            <div style={{ whiteSpace: 'pre-line' }}>{post.content}</div>
          </Typography>
          <Box
            sx={{
              mt: 3,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {post.image &&
              Object.entries(post.image).length !== 0 &&
              Object.entries(post.image).map((v: Array<any>, i: number) => {
                return (
                  <>
                    <Box
                      sx={{
                        mt: 3,
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <img key={i} src={v[1][0]} />
                      <Typography sx={{ mb: 2, mt: 1 }}>{v[1][2]}</Typography>
                    </Box>
                  </>
                );
              })}
          </Box>
          <CardActions>
            <Link href="/">
              <Button size="small">뒤로가기</Button>
            </Link>
          </CardActions>
        </Box>
      )}
    </Container>
  );
};

export default Detail;

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, 'posts'));
  const paths = snapshot.docs.map((doc: any) => {
    console.log(doc);
    return {
      params: {
        rounge:
          doc[
            '_document'
          ].data.value.mapValue.fields.rounge.stringValue.toString(),
        postid: doc.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.postid;

  const docRef = doc(db, 'posts', id);

  const docSnap = await getDoc(docRef);

  return {
    props: { postProps: JSON.stringify(docSnap.data()), postId: id || null },
  };
};
