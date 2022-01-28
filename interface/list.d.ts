interface ImageProps {
  src: string;
}

interface PageProps {
  now: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    profile: string;
  };
  timestamp: number;
}
