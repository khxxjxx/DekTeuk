import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import Layout from '@layouts/Layout';
import { getTopics } from '@utils/function';
import { TestTopicCard } from '@components/Card';
import { TopicPost } from '@interface/CardInterface';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
import { setDataAction } from '@store/reducer';
import { RootReducer } from '@store/reducer';

export default function TopicPage() {
  const router = useRouter();

  const topicType = router.query.topic as string;

  const { ref, inView } = useInView();

  const [stopFetch, setStopFetch] = useState<boolean>(false); // 파이어베이스 연동시 사용

  const [end, setEnd] = useState<any>(0); // 파이어베이스 연동시 사용

  const dispatch = useDispatch();

  const { data, key } = useSelector(
    (state: RootReducer) => state.tempData.tempData,
  );

  useEffect(() => {
    if (data.length === 0 || key != router.asPath.split('/')[3]) {
      console.log('첫 번째 디스패치');
      dispatch(
        setDataAction({
          data: getTopics(topicType, 'test'),
          key: router.asPath.split('/')[3],
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (inView === true && stopFetch === false) {
      const newtPosts = getTopics(topicType, 'test');
      dispatch(
        setDataAction({
          data: [...data, ...newtPosts],
          key: router.asPath.split('/')[3],
        }),
      );
    }
  }, [inView]);

  return (
    <Layout>
      {data.length &&
        data.map((post: any, idx: number) => {
          return idx == data.length - 2 ? (
            <TestTopicCard topicCardData={post} key={idx} />
          ) : (
            <TestTopicCard topicCardData={post} key={idx} />
          );
        })}
      <div ref={ref}></div>
    </Layout>
  );
}
