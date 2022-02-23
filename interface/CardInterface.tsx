export interface PostAuthor {
  nickname: string;
  jobSector: string;
}

export interface RoungeObj {
  title: string;
  url: string;
}
export interface TopicObj {
  title: string;
  url: string;
}

export interface RoungePost {
  pressPerson: string[];
  postId: string;
  postType: 'rounge';
  rounge: RoungeObj;
  title: string;
  content: string;
  author: PostAuthor;
  commentsCount: number;
  likeCount: number;
  createdAt: string;
  images: string[];
}
export interface TopicPost {
  pressPerson: string[];
  postId: string;
  postType: 'topic';
  topic: TopicObj;
  title: string;
  content: string;
  author: PostAuthor;
  commentsCount: number;
  likeCount: number;
  createdAt: string;
  images: string[];
}
