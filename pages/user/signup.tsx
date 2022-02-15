import React, { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { db, auth } from '@firebase/firebase';
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import { UserInfo } from '@interface/StoreInterface';
import { setNewUserInfo } from '@store/reducer';
import {
  userInputInitialState,
  jobSectors,
  UserInputData,
  InputHelperText,
} from './constants';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const reducer = (state: UserInputData, action: any) => {
  return { ...state, [action.type]: action.payload };
};
export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const storage = getStorage();
  const [inputState, inputDispatch] = useReducer(
    reducer,
    userInputInitialState,
  );
  const provider = new GoogleAuthProvider();
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageExt, setImageExt] = useState<string>('');
  const [inputHelpers, setInputHelpers] = useState<InputHelperText>({
    email: '',
    password: '6자리 이상 입력 해 주세요',
    checkPassword: '비밀번호가 같지 않습니다.',
    nickname: '',
    jobSector: '직종을 선택 해 주세요',
  });

  const { email, password, checkPassword, nickname, jobSector } = inputState;

  const checkSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user.uid;
    } catch (err: any) {
      console.error(err);
    }
  };

  const loginWithGoogle = async () => {
    const uid = await checkSignIn();
    const docSnap = await getDoc(doc(db, 'user', uid as string));
    if (docSnap.exists()) {
      dispatch(setNewUserInfo(docSnap.data()));
      router.push('/');
    } else {
      router.push('/user/google');
    }
  };

  const createUserWithEmail = async () => {
    try {
      const { user: result } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      sendEmailVerification(result);
      return result.uid;
    } catch (err: any) {
      console.error(err);
    }
  };

  const SignUpSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uid = (await createUserWithEmail()) as string;

    if (checkPassword !== password) {
      alert('비밀번호가 다릅니다!');
    } else {
      const userData: UserInfo = {
        nickname: nickname,
        jobSector: jobSector,
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
            title: jobSector,
            url: jobSectors.find((v) => v.title === jobSector)?.url as string,
            // type error 잡아야 함
          },
        ],
        id: uid,
        hasNewNotification: true,
        posts: [],
        email: email,
      };

      uploadImg(uid);
      console.log('success');
      await setDoc(doc(db, 'user', uid), userData);
      await signOut(auth);
      router.push('/user/login');
    }
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
      where('nickname', '==', nickname),
    );
    let nicknameHelperText;
    const nicknameCheckSnap = await getDocs(nicknameCheckQuery);
    if (nicknameCheckSnap.docs.length !== 0 || nickname.length < 3) {
      nicknameHelperText = '사용 불가능한 닉네임 입니다!';
    } else {
      nicknameHelperText = '사용 가능한 닉네임 입니다!';
    }
    const newInputHelper = {
      ...inputHelpers,
      nickname: nicknameHelperText,
    };

    setInputHelpers(newInputHelper);
  };

  const onImageChange = (e: any) => {
    console.log(e.target.name);
    const image = e.target.files[0] as File;
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
    inputDispatch({ type: name, payload: value });
  };
  return (
    <>
      <Main>
        <h1 style={{ color: '#8946A6' }}>회원가입</h1>
        <form onSubmit={SignUpSubmitHandler}>
          <WrapContents>
            <WrapInput>
              <Label>Email</Label>
              <TextFields
                required
                placeholder="Email 주소를 입력해 주세요."
                name="email"
                value={email}
                onChange={onInputChange}
                helperText={inputHelpers.email}
              />
            </WrapInput>
            <WrapInput>
              <Label>비밀번호</Label>
              <TextFields
                required
                type="password"
                placeholder="비밀번호는 6자리 이상 입력해주세요."
                variant="outlined"
                margin="dense"
                name="password"
                value={password}
                onChange={onInputChange}
                helperText={inputHelpers.password}
              />
              <TextFields
                required
                type="password"
                placeholder="비밀번호를 한 번더 입력해 주세요."
                variant="outlined"
                margin="dense"
                name="checkPassword"
                value={checkPassword}
                onChange={onInputChange}
                helperText={inputHelpers.checkPassword}
              />
            </WrapInput>

            <WrapInput>
              <Label>닉네임</Label>
              <TextFields
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
                helperText={inputHelpers.nickname}
              />
            </WrapInput>
            <WrapImageUpload>
              <Label>증명서</Label>
              <label
                htmlFor="contained-button-file"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Input
                  name="image"
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
                  <CameraAltIcon />
                  파일 선택
                </Button>
              </label>
              <Button
                variant="contained"
                component="span"
                onClick={onClearImg}
                style={{ background: '#8946a6', marginLeft: 10 }}
              >
                <DeleteForeverIcon />
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
                variant="outlined"
                margin="dense"
                name="jobSector"
                value={jobSector}
                onChange={onInputChange}
                helperText={inputHelpers.jobSector}
              >
                {jobSectors.map((value, idx) => (
                  <MenuItem key={idx} value={value.title}>
                    {value.title}
                  </MenuItem>
                ))}
              </TextFields>
            </WrapInput>

            <SubmitButton type="submit">
              <GroupAddIcon />
              회원가입
            </SubmitButton>
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

const GoogleButton = styled(Button)`
  background: #8946a6;
  border-radius: 5px;
  border: none;
  color: white;

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
