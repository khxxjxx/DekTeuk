import { FormEvent, useRef } from 'react';

import styled from '@emotion/styled';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const InputBox = () => {
  const inputValue = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(inputValue.current!.value);
  };

  return (
    <InputContainer>
      <form onSubmit={onSubmitHandler}>
        <Input ref={inputValue} required />
        <Placeholder>검색</Placeholder>
        <InputIcon type="submit">
          <ArrowForwardIcon sx={{ color: '#B353FF' }} />
        </InputIcon>
      </form>
    </InputContainer>
  );
};

export default InputBox;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 37px;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0 #e3e3e3;
  background: #ffffff;
  padding: 0 40px 0 10px;

  &:focus {
    outline: 1px solid #8946a6;
  }

  &:focus,
  &:not(:focus):valid {
    & + div {
      top: -7px;
      left: 12px;
      font-size: 11px;
      color: #8946a6;
    }
  }

  &::placeholder {
    font-size: 10px;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 11px;
  left: 10px;
  font-size: 12px;
  color: gray;
  width: 28px;
  text-align: center;
  background: #ffffff;
  transition: all 0.2s ease;
`;

const InputIcon = styled.button`
  position: absolute;
  top: 6px;
  right: 10px;
  background: none;
  border: none;
`;
