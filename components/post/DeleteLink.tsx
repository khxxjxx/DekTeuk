import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@firebase/firebase';
import Router from 'next/router';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { setDataAction } from '@store/reducer';
import { deleteOnePostAction } from '@store/reducer';
import styled from '@emotion/styled';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '4px 4px 4px 4px',
  boxShadow: 24,
  p: 4,
};

const DialogStyled = styled(Dialog)`
  & .MuiDialog-paper {
    background-color: white;
    color: black;
  }
  & .MuiDialogContentText-root {
    color: black;
  }
  @media (prefers-color-scheme: dark) {
    & .MuiDialog-paper {
      background-color: ${({ theme }: any) => theme.blackGray};
      color: white;
    }
    & .MuiDialogContentText-root {
      color: white;
    }
  }
`;

const BoxStyled = styled(Box)`
  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }: any) => theme.blackGray};
  }
`;

export default function DeleteLink(props: any) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [delError, setDelError] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async (e: any) => {
    // e.stopPropagation();
    try {
      const docRef = doc(db, 'post', props.thisPost);
      await deleteDoc(docRef);
      setOpen(false);
      setModalOpen(true);
    } catch (error: any) {
      setDelError(error);
    }
  };

  //modal 창 생성

  return (
    <div>
      <Box sx={{ ml: 1 }}>
        <Button size="large" color="error" onClick={handleClickOpen}>
          <DeleteIcon sx={{ mr: 1 }} />
          삭제하기
        </Button>
      </Box>

      <DialogStyled
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ wordBreak: 'break-all' }}>
          {props.thisPostTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            이 게시물을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleConfirm} autoFocus>
            확인
          </Button>
        </DialogActions>
      </DialogStyled>

      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxStyled sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ wordBreak: 'break-all' }}
          >
            {props.thisPostTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {delError === ''
              ? '게시물을 삭제하였습니다'
              : '삭제 중 오류가 발생하였습니다 다시 시도해 주세요'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{ mt: 2 }}
              onClick={() => {
                dispatch(
                  setDataAction({
                    data: [],
                    key: '',
                  }),
                );
                Router.back();
                dispatch(deleteOnePostAction({ postId: props.thisPost }));
              }}
            >
              확인
            </Button>
          </Box>
        </BoxStyled>
      </Modal>
    </div>
  );
}
