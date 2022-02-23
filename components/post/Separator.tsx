import Breadcrumbs from '@mui/material/Breadcrumbs';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styled from '@emotion/styled';
const BreadcrumbsStyled = styled(Breadcrumbs)`
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }: any) => theme.lightGray};
  }
`;
export default function CustomSeparator(props: any) {
  const breadcrumbs =
    props.menu.postType === 'rounge'
      ? [
          <Link
            underline="hover"
            key="1"
            color="inherit"
            href={'/list/' + props.menu.postType}
          >
            {props.menu.postType === 'rounge' ? '라운지' : '토픽'}
          </Link>,
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href={'/list/' + props.menu.postType + '/' + props.menu.rounge.url}
          >
            {props.menu.rounge.title}
          </Link>,
        ]
      : [
          <Link
            underline="hover"
            key="1"
            color="inherit"
            href={'/list/' + props.menu.postType}
          >
            {props.menu.postType === 'rounge' ? '라운지' : '토픽'}
          </Link>,
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href={'/list/' + props.menu.postType + '/' + props.menu.topic.url}
          >
            {props.menu.topic.title}
          </Link>,
        ];

  return (
    <Stack
      spacing={2}
      sx={{
        mt: 4,
        mb: 2,
      }}
    >
      <BreadcrumbsStyled
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </BreadcrumbsStyled>
    </Stack>
  );
}
