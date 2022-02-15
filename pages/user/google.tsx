import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
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
import MenuItem from '@mui/material/MenuItem';
import { UserInfo } from '@interface/StoreInterface';
import { UserInputData, userInputInitialState, jobSectors } from './constants';
import { getAuth } from 'firebase/auth';
import { userInputValidation } from '@utils/userInputValidation';

const reducer = (state: UserInputData, action: any) => {
  return {
    ...state,
    [action.type]: { value: action.payload.value, error: action.payload.error },
  };
};
export default function Google() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inputState, inputDispatch] = useReducer(
    reducer,
    userInputInitialState,
  );
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageExt, setImageExt] = useState<string>('');

  const storage = getStorage();
  const { nickname, jobSector } = inputState;
  useEffect(() => {
    const auth = getAuth();
    const curUser = auth.currentUser;
    console.log('google account');
    setEmail(curUser?.email!);
    console.log(inputState);
  }, []);

  const SignUpSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid as string;
    if (!uid) {
      alert('다시 로그인 해주세요!');
      router.push('/user/login');
    }
    if (!imageUrl) {
      alert('증명서 파일을 찾을 수 없습니다!');
      return;
    }
    const userInitData: UserInfo = {
      nickname: nickname.value,
      jobSector: jobSector.value,
      validRounges: [
        {
          title: '타임라인',
          url: 'timeline',
        },
        {
          title: '토픽',
          url: 'topic',
        },
        {
          title: jobSector.value,
          url: jobSectors.find((v) => v.title === jobSector.value)
            ?.url as string,
        },
      ],
      id: uid,
      hasNewNotification: true,
      posts: [],
      email: email,
    };
    uploadImg(uid!);
    console.log('success');
    const docSnap = await setDoc(doc(db, 'user', uid!), userInitData);
    console.log(docSnap);
    await signOut(auth);
    router.push('/user/login');
  };

  const uploadImg = async (uid: string) => {
    const imageName = `${uid}.${imageExt}`;
    const imgRef = ref(storage, imageName);
    try {
      await uploadString(imgRef, imageUrl, 'data_url');
    } catch (e: any) {
      console.error(e);
    }
  };

  const checkNickname = async () => {
    const nicknameCheckQuery = query(
      collection(db, 'user'),
      where('nickname', '==', nickname.value),
    );
    const nicknameCheckSnap = await getDocs(nicknameCheckQuery);
    let nicknameHelperText;
    if (nicknameCheckSnap.docs.length !== 0 || nickname.value.length < 3) {
      nicknameHelperText = '사용 불가능한 닉네임 입니다!';
      setError(true);
    } else {
      nicknameHelperText = '사용 가능한 닉네임 입니다!';
      setError(false);
    }
  };

  const onImageChange = (e: any) => {
    const image = e.target.files[0]!;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImageUrl(result);
    };
    setImageExt(e.target.value.split('.')[1]);
    e.target.value = '';
  };
  const onClearImg = () => setImageUrl('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = userInputValidation(name, value);
    inputDispatch({ type: name, payload: { value, error } });
  };

  return (
    <>
      <Main>
        <h1 style={{ color: '#8946A6' }}>회원가입</h1>
        <form onSubmit={SignUpSubmitHandler}>
          <WrapContents>
            <WrapInput>
              <Label>Email</Label>
              <TextFields required disabled name="email" value={email} />
            </WrapInput>
            <WrapInput>
              <Label>닉네임</Label>
              <TextFields
                required
                error={nickname.error ? true : false}
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
                value={nickname.value}
                onChange={onInputChange}
                helperText={nickname.error}
              />
            </WrapInput>
            <WrapImageUpload>
              <Label>증명서</Label>
              <label
                htmlFor="contained-button-file"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={onImageChange}
                />
                <Button
                  variant="contained"
                  component="span"
                  style={{ background: '#8946a6', marginLeft: 10 }}
                >
                  파일 선택
                </Button>
              </label>
              <Button
                variant="contained"
                component="span"
                onClick={onClearImg}
                style={{ background: '#8946a6', marginLeft: 10 }}
              >
                사진 지우기
              </Button>
            </WrapImageUpload>
            {imageUrl && (
              <img src={imageUrl} alt={imageUrl} width="150px" height="200px" />
            )}
            <WrapInput>
              <Label>직종</Label>
              <TextFields
                select
                error={jobSector.error ? true : false}
                variant="outlined"
                margin="dense"
                name="jobSector"
                value={jobSector.value}
                onChange={onInputChange}
                helperText={jobSector.error}
              >
                {jobSectors.map((value, idx) => (
                  <MenuItem key={idx} value={value.title}>
                    {value.title}
                  </MenuItem>
                ))}
              </TextFields>
            </WrapInput>
            <SubmitButton type="submit">회원가입</SubmitButton>
          </WrapContents>
        </form>
      </Main>
    </>
  );
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

const WrapImageUpload = styled.div`
  display: flex;
  flex-direction: row;
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

const TextFields = styled(TextField)`
  color: #8946a6;
  margin: 5px;
`;
