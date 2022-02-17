export interface UrlObj {
  title: string;
  url: string;
}

export interface MyPostData {
  title: string;
  postId: string;
  content: string;
  postType: string;
  url: UrlObj;
}
