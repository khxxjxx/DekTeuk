import styled from '@emotion/styled';
import Image from 'next/image';

// interface Url {
//   url: string;
//   imgName: string;
//   imgDetail: string;
// }

const ImgWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  position: relative;
  overflow: hidden;
  zindex: 1;
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const ImgCount = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  z-index: 50;
`;

const ImgComponent = ({ urls }: { urls: Array<string> }) => {
  return (
    <ImgWrapper>
      {urls.length > 1 && (
        <ImgCount>
          <span style={{ color: 'white' }}>+{urls.length}</span>
        </ImgCount>
      )}

      <Image
        width={'100%'}
        height={'100%'}
        objectFit={'cover'}
        src={`${urls[0]}`}
        alt="test"
      />
    </ImgWrapper>
  );
};

export default ImgComponent;
