import styled from '@emotion/styled';

const Pagination = ({
  page,
  setPage,
}: {
  page: number;
  setPage: (value: number) => void;
}) => {
  return (
    <Pages>
      <MovePage
        onClick={() =>
          setPage(Math.floor(page % 5 === 0 ? page / 5 - 1 : page / 5) * 5)
        }
        disabled={page < 6}
      >
        이전
      </MovePage>
      {Array(5)
        .fill(Math.floor(page % 5 === 0 ? page / 5 - 1 : page / 5) * 5 + 1)
        .map((pages, idx) => (
          <Page
            key={idx}
            onClick={() => setPage(pages + idx)}
            now={pages + idx === page}
          >
            {pages + idx}
          </Page>
        ))}
      <MovePage
        onClick={() =>
          setPage(Math.floor(page % 5 === 0 ? page / 5 : page / 5 + 1) * 5 + 1)
        }
        disabled={page > 10}
      >
        다음
      </MovePage>
    </Pages>
  );
};

export default Pagination;

const Pages = styled.div`
  margin: 10px auto;
  width: 250px;
`;

const Page = styled.button<PageProps>`
  background: none;
  border: none;
  padding: 10px;
  ${(props) => props.now && 'color: #B762C1; font-weight:bold;'};
`;

const MovePage = styled.button`
  background: none;
  border: none;
`;
