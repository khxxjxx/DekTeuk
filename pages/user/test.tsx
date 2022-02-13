import React, { useState } from 'react';
import { getStorage } from 'firebase/storage';
import fetch from 'isomorphic-unfetch';
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import { getDateTime } from '@utils/function';
import type { NextApiRequest, NextApiResponse } from 'next';
const txtData = [
  {
    valueType: 'ALL',
    inferText: '사업자등록증',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '(법인사업자)',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    inferText: '등록번호 :',
    inferConfidence: 0.9455,
  },
  {
    valueType: 'ALL',
    inferText: '130-81-83505',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    inferText: '법인명',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '(단체명)',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '주식회사',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '창세환경',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    inferText: '대',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '표',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '자',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '천창봉',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '개업년월일:',
    inferConfidence: 0.9183,
  },
  {
    valueType: 'ALL',
    inferText: '2001년',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '12월',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '01일',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '법인등록번호:',
    inferConfidence: 0.9432,
  },
  {
    valueType: 'ALL',
    inferText: '134911-0020965',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '사업장',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '소재지',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '경기도',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '광명시',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '하안로',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '108',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '.',
    inferConfidence: 0.6709,
  },
  {
    valueType: 'ALL',
    inferText: '719(소하동,에이스굉명타워)',
    inferConfidence: 0.9805,
  },
  {
    valueType: 'ALL',
    inferText: '본점소재지:',
    inferConfidence: 0.9286,
  },
  {
    valueType: 'ALL',
    inferText: '경기도',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '광명시',
    inferConfidence: 0.9987,
  },
  {
    valueType: 'ALL',
    inferText: '하안로',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '108,',
    inferConfidence: 0.958,
  },
  {
    valueType: 'ALL',
    inferText: '719(소하동,에이스공명타워)',
    inferConfidence: 0.9953,
  },
  {
    valueType: 'ALL',
    inferText: 'S',
    inferConfidence: 0.9399,
  },
  {
    valueType: 'ALL',
    inferText: '사업의 종류',
    inferConfidence: 0.9421,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    inferText: '업태',
    inferConfidence: 0.9743,
  },
  {
    valueType: 'ALL',
    inferText: '서비스',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '종목',
    inferConfidence: 0.9993,
  },
  {
    valueType: 'ALL',
    inferText: '청소업,저수조청소,',
    inferConfidence: 0.9929,
  },
  {
    valueType: 'ALL',
    inferText: '소독업',
    inferConfidence: 0.9956,
  },
  {
    valueType: 'ALL',
    inferText: '도소매',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '청소용품',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '통신판매',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '소독약품',
    inferConfidence: 0.9986,
  },
  {
    valueType: 'ALL',
    inferText: '건물관리업',
    inferConfidence: 0.9964,
  },
  {
    valueType: 'ALL',
    inferText: '건물관리업',
    inferConfidence: 0.9981,
  },
  {
    valueType: 'ALL',
    inferText: 'H',
    inferConfidence: 0.9478,
  },
  {
    valueType: 'ALL',
    inferText: '10NA',
    inferConfidence: 0.9988,
  },
  {
    valueType: 'ALL',
    inferText: 'NTS',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    inferText: '교',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '부',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '사',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '유',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    inferText: '사업장이전',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    inferText: '국세청',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: 'KOREA',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    inferText: '사업자단위과세',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '적용사업자',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    inferText: '여부:',
    inferConfidence: 0.998,
  },
  {
    valueType: 'ALL',
    inferText: '여(',
    inferConfidence: 0.9969,
  },
  {
    valueType: 'ALL',
    inferText: ')',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '부(V)',
    inferConfidence: 0.9415,
  },
  {
    valueType: 'ALL',
    inferText: '2012',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '년',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '03 월',
    inferConfidence: 0.9674,
  },
  {
    valueType: 'ALL',
    inferText: '13 일',
    inferConfidence: 0.9637,
  },
  {
    valueType: 'ALL',
    inferText: '시 흥',
    inferConfidence: 0.8783,
  },
  {
    valueType: 'ALL',
    inferText: '세무서장',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    inferText: '단위는(인)',
    inferConfidence: 0.8765,
  },
  {
    valueType: 'ALL',
    inferText: 'NTS',
    inferConfidence: 0.9942,
  },
  {
    valueType: 'ALL',
    inferText: '국세청',
    inferConfidence: 0.9997,
  },
];

const txtData1 = [
  {
    valueType: 'ALL',
    inferText: '국세청',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: 'nts.go.kr',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '사업자등록증',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    inferText: '(',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '법인사업자:',
    inferConfidence: 0.9951,
  },
  {
    valueType: 'ALL',
    inferText: '본점',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: ')',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '등록번호 :',
    inferConfidence: 0.9277,
  },
  {
    valueType: 'ALL',
    inferText: '101-82-07976',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '법인명(단체명)',
    inferConfidence: 0.9924,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '아름다운재단',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '대',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '표',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '자 :',
    inferConfidence: 0.9766,
  },
  {
    valueType: 'ALL',
    inferText: '한찬희',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '개업연월일:',
    inferConfidence: 0.9631,
  },
  {
    valueType: 'ALL',
    inferText: '2002',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '년',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '10',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '월',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '17 일',
    inferConfidence: 0.9435,
  },
  {
    valueType: 'ALL',
    inferText: '법인등록번호',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '110122-0032797',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '사업장',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '소재지',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '서울특별시',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '종로구',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '자하문로19길',
    inferConfidence: 0.9987,
  },
  {
    valueType: 'ALL',
    inferText: '6(옥인동)',
    inferConfidence: 0.9944,
  },
  {
    valueType: 'ALL',
    inferText: '본점소재지',
    inferConfidence: 0.9626,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '서울특별시',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '종로구',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '자하문로19길',
    inferConfidence: 0.9984,
  },
  {
    valueType: 'ALL',
    inferText: '6(옥인동)',
    inferConfidence: 0.9987,
  },
  {
    valueType: 'ALL',
    inferText: 'RE',
    inferConfidence: 0.9945,
  },
  {
    valueType: 'ALL',
    inferText: 'ER',
    inferConfidence: 0.882,
  },
  {
    valueType: 'ALL',
    inferText: '사업의',
    inferConfidence: 0.9992,
  },
  {
    valueType: 'ALL',
    inferText: '종류:',
    inferConfidence: 0.8209,
  },
  {
    valueType: 'ALL',
    inferText: '업태',
    inferConfidence: 0.9952,
  },
  {
    valueType: 'ALL',
    inferText: '소매',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '종목',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '재활용품',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '제조',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '출판',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '서비스',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '광고업',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: 'OF',
    inferConfidence: 0.9989,
  },
  {
    valueType: 'ALL',
    inferText: 'TANAT',
    inferConfidence: 0.8769,
  },
  {
    valueType: 'ALL',
    inferText: '발',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '급사',
    inferConfidence: 0.8332,
  },
  {
    valueType: 'ALL',
    inferText: '유',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '재출력희망 (컬러출)',
    inferConfidence: 0.9568,
  },
  {
    valueType: 'ALL',
    inferText: 'N',
    inferConfidence: 0.9679,
  },
  {
    valueType: 'ALL',
    inferText: '국세청',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: 'KOREA',
    inferConfidence: 0.9896,
  },
  {
    valueType: 'ALL',
    inferText: '사업자',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '단위',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '과세',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '적용사업자 여부',
    inferConfidence: 0.9945,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '여(',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    inferText: ')부(V)',
    inferConfidence: 0.9486,
  },
  {
    valueType: 'ALL',
    inferText: '전자세금계산서',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '전용',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '전자우편주소',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: ':',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    inferText: '2019',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '년',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: '07 월 22',
    inferConfidence: 0.9337,
  },
  {
    valueType: 'ALL',
    inferText: '일',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    inferText: '종로세무서장',
    inferConfidence: 0.9949,
  },
  {
    valueType: 'ALL',
    inferText: '국세청',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    inferText: '국세청',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    inferText: 'Service',
    inferConfidence: 0.9871,
  },
];

export default function Test() {
  const timestamp = new Date().getTime();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageExt, setImageExt] = useState<string>('');
  let sumText = '';
  const data = {
    images: [
      {
        format: imageExt,
        name: 'medium',
        data: imageUrl,
        url: null,
      },
    ],
    lang: 'ko',
    requestId: 'string',
    resultType: 'string',
    timestamp: timestamp,
    version: 'V1',
  };
  const onImageChange = (e: any) => {
    const image = e.target.files[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    //reader.readAsBinaryString(image);
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImageUrl(result.split(',')[1]);
    };
    setImageExt(e.target.value.split('.')[1]);
    e.target.value = '';
  };
  const onOcr = () => {
    axios.post('http://localhost:3000/api/ocr', data).then((res) => {
      // res.data.images[0].fields.forEach((elem: any) => {
      //   console.log('===', elem.inferText);
      //   sumText += '' + elem.inferText;
      // });
      resultTxt(res.data.message);
      console.log(res.data.message);
    });
  };
  const resultTxt = (data: any) => {
    const filteredText: any = [];
    data.forEach((el: any, idx: number) => {
      if (el.inferText === '등록번호 :') {
        console.log(data[idx + 1].inferText);
      } else if (el.inferText === '개업연월일:') {
        console.log(data[idx - 1].inferText);
        console.log(data[idx + 1].inferText);
        console.log(data[idx + 2].inferText);
        console.log(data[idx + 3].inferText);
      }
    });

    console.log(filteredText);
  };
  return (
    <>
      <input type="file" accept="image/*" onChange={onImageChange} />
      <button onClick={onOcr}>Ocr</button>
      <button onClick={resultTxt}>result</button>
    </>
  );
}
