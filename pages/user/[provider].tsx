import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { db, auth } from '@firebase/firebase';
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
type UserData = {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
  isGoogle: boolean;
};
export default function Signup(provider: any) {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileExt, setFileExt] = useState<string>('');
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserData>([]);
  const storage = getStorage();

  useEffect(() => {
    if (provider === 'google') {
      console.log('google account');
      setIsGoogle(true);
      setEmail(auth.currentUser?.email!);
      setPassword(auth.currentUser?.email!);
      setCheckPassword(auth.currentUser?.email!);
    }
  }, []);
  const userInitData = {
    nickname: nickname,
    jobSector: '',
    validRounges: [
      {
        title: '타임라인',
        url: 'timeline',
      },
    ],
    myChattings: [
      {
        roomName: '',
        roomId: '',
        isGroup: false,
        lastMessage: {
          content: '',
          updatedAt: '',
        },
        unreadCount: 0,
      },
    ],
    hasNewNotification: true,
    post: [],
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'checkPassword') setCheckPassword(value);
    else if (name === 'nickname') setNickname(value);
  };

  const createUserWithEmail = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return result;
    } catch (err: any) {
      return err.code;
    }
  };
  const SignUpSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkPassword !== password) {
      alert('비밀번호가 다릅니다!');
    } else {
      // const fileName = uid + fileExt;
      // const imgRef = ref(storage, fileName);
      // await uploadString(imgRef, fileUrl, 'data_url').then((snapshot) => {
      //   console.log('success upload');
      // });
      const createUserResult = await createUserWithEmail();

      if (createUserResult.user || isGoogle) {
        console.log('success');
        await setDoc(doc(db, 'user', createUserResult.user.uid), userInitData);
        await signOut(auth);
        router.push('/');
      } else {
        console.log(createUserResult);
      }
    }

    // try {
    //   await createUserWithEmailAndPassword(auth, email, password);
    //   uploadImg();
    //   router.push;
    // } catch (err: any) {
    //   console.log(setError(err.code));
    // }
  };

  const checkNickname = async () => {
    const nicknameCheckQuery = query(
      collection(db, 'user'),
      where('nickname', '==', nickname),
    );
    const nicknameCheckSnap = await getDocs(nicknameCheckQuery);
    if (nicknameCheckSnap.docs.length !== 0) {
      alert('닉네임이 중복되었습니다!');
    }
  };

  const onFileChange = (e: any) => {
    const files = e.target.files!;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileUrl(result);
    };

    setFileExt(e.target.value.split('.')[1]);
    // setFileUrl(URL.createObjectURL(e.target.files[0]));
    e.target.value = '';
  };
  const onClearImg = () => setFileUrl('');
  return (
    <>
      <Main>
        <h1 style={{ color: '#8946A6' }}>회원가입</h1>
        <form onSubmit={SignUpSubmitHandler}>
          <WrapContents>
            <WrapInput>
              <Label>Email</Label>
              <TextField
                required
                disabled={isGoogle}
                variant="outlined"
                placeholder="Email 주소를 입력해 주세요."
                name="email"
                defaultValue={isGoogle ? email : ''}
                onChange={onInputChange}
              />
            </WrapInput>
            <WrapInput>
              <Label>비밀번호</Label>
              <TextField
                required
                disabled={isGoogle}
                fullWidth
                type="password"
                placeholder="비밀번호는 6자리 이상 입력해주세요."
                variant="outlined"
                margin="dense"
                name="password"
                value={password}
                onChange={onInputChange}
              />
              <TextField
                required
                disabled={isGoogle}
                type="password"
                placeholder="비밀번호를 한 번더 입력해 주세요."
                variant="outlined"
                margin="dense"
                name="checkPassword"
                value={checkPassword}
                onChange={onInputChange}
              />
            </WrapInput>

            <WrapInput>
              <Label>닉네임</Label>
              <TextField
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CheckButton type="button" onClick={checkNickname}>
                        중복확인
                      </CheckButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                margin="dense"
                name="nickname"
                placeholder="닉네임을 입력해 주세요."
                value={nickname}
                onChange={onInputChange}
              />
            </WrapInput>
            <WrapInput>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={onFileChange}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </WrapInput>
            {fileUrl && (
              <WrapInput>
                <img src={fileUrl} width="150px" height="200px" />
                <button onClick={onClearImg}>사진 지우기</button>
              </WrapInput>
            )}
            <SubmitButton type="submit">회원가입</SubmitButton>
          </WrapContents>
        </form>
      </Main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { provider } = context.params;

  console.log('===========context', provider);
  console.log('===========context===========');
  return {
    props: provider,
  };
}

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WrapContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 100%;
`;

const CheckButton = styled.button`
  background: #8946a6;
  border-radius: 5px;
  border: none;
  color: white;
  width: 60px;
  height: 24px;
  margin: 5px;
  font-size: 12px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const SubmitButton = styled.button`
  background: #8946a6;
  border-radius: 5px;
  border: none;
  color: white;
  width: 173px;
  height: 58px;
  font-size: 20px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const Label = styled.label`
  color: #8946a6;
  margin: 5px;
  ::after {
    content: '*';
    color: red;
  }
`;
const Input = styled('input')({
  display: 'none',
});
