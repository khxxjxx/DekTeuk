import { useState } from 'react';

import ButtonComponent from '@components/items/ButtonComponent';
import InputComponent from '@components/items/InputComponent';

const MyPageNickName: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');

  const nicknameChange = () => {
    console.log('닉네임 변경', nickname);
  };

  return (
    <article>
      <h1>비밀번호 변경</h1>
      <div>
        <InputComponent
          placeholder="닉네임을 입력해주세요"
          changeFn={setNickname}
        ></InputComponent>
        <ButtonComponent
          text="변경하기"
          activeFn={nicknameChange}
        ></ButtonComponent>
      </div>
    </article>
  );
};

export default MyPageNickName;
