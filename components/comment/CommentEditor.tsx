import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const Editor = dynamic<EditorProps>(
  () => import('@toast-ui/react-editor').then((m) => m.Editor),
  { ssr: false },
);

const CommentEditorSection = styled.section`
  display: flex;
  flex-direction: column;
  & button {
    margin-top: 30px;
    align-self: flex-end;
  }
`;

const CommentEditor: React.FC = () => {
  return (
    <CommentEditorSection>
      <Editor
        initialValue=""
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
      <Button variant="contained" size="medium" color="secondary">
        답변하기
      </Button>
    </CommentEditorSection>
  );
};

export default CommentEditor;
