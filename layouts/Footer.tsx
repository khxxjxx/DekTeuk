import styled from '@emotion/styled';

const FooterDiv = styled.footer`
  display: flex;
  padding: 2rem 2rem 2rem 2rem;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 118px;
  bottom: 0;
  left: 0;
`;
const Footer = () => {
  return (
    <FooterDiv>
      <div>Generate by elice Team 5</div>
    </FooterDiv>
  );
};

export default Footer;
