export interface PostData {
  id: string;
  ownerId: string;
  type: string;
  title: string;
}

export interface CommentData {
  bundleId: number;
  bundleOrder: number;
  createdAt: string;
  deletedAt: string;
  id: string;
  isDeleted: boolean;
  job: string;
  likes: number;
  nickname: string;
  origin: boolean;
  postId: string;
  pressedPerson: Array<string>;
  text: string;
  updatedAt: string;
  userId: string;
}
