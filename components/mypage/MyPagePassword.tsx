import { useState } from 'react';

import ButtonComponent from '@components/items/ButtonComponent';
import InputComponent from '@components/items/InputComponent';

const MyPagePassword: React.FC = () => {
  const [pw, setPw] = useState<string>('');
  const [pwCheck, setPwCheck] = useState<string>('');

  const passwordChange = () => {
    if (pw === pwCheck) {
      console.log('비밀번호가 동일하네!');
    } else {
      console.log('비밀번호가 동일하지 않네!');
    }
  };

  return (
    <article>
      <h1>비밀번호 변경</h1>
      <div>
        <InputComponent></InputComponent>
        <InputComponent></InputComponent>
        <ButtonComponent
          text="비밀번호 변경하기"
          activeFn={passwordChange}
        ></ButtonComponent>
      </div>
    </article>
  );
};

export default MyPagePassword;
