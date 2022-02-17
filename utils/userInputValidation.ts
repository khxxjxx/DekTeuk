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
import { UserInputData } from '@interface/constants';
import { reg_email } from '@interface/constants';

export const userInputChangeValidation = (name: string, value: string) => {
  if (name === 'email') {
    // .test => 주어진 정규표현식 만족하는지에 따라 T/F 반환
    if (!reg_email.test(value)) return '이메일 형식에 맞춰 입력해 주세요!';
  } else if (name === 'password' || name === 'checkPassword') {
    if (value.length < 6) {
      return '6자리 이상 입력해 주세요!';
    }
  } else if (name === 'nickname') {
    if (value.length < 3) return '3자리 이상 입력해 주세요!';
  } else if (name === 'jobSector') {
    if (value.length <= 0) return '직종을 선택해 주세요!';
  }

  return '';
};

export const userInputSubmitValidation = (state: UserInputData) => {
  const result = Object.values(state).filter((v) => {
    if (v.error) return true;
  });

  return result;
};
