import React, { useState } from 'react';
import { getStorage } from 'firebase/storage';
import fetch from 'isomorphic-unfetch';
import { InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import { getDateTime } from '@utils/function';
import type { NextApiRequest, NextApiResponse } from 'next';

// 됨 - asdf.jpg
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
const txtDataToJoin =
  '사업자등록증(법인사업자)등록번호 :130-81-83505법인명(단체명):주식회사창세환경대표자:천창봉개업년월일:2001년12월01일법인등록번호:134911-0020965사업장소재지:경기도광명시하안로108.719(소하동에이스굉명타워)본점소재지:경기도광명시하안로108719(소하동에이스공명타워)S사업의 종류:업태서비스종목청소업저수조청소소독업도소매청소용품통신판매소독약품건물관리업건물관리업H10NANTS교부사유:사업장이전국세청KOREA사업자단위과세적용사업자여부:여()부(V)2012년03 월13 일시 흥세무서장단위는(인)NTS국세청';

// 됨 - business_license.jpg
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
const txtDataToJoin1 =
  '국세청nts.go.kr사업자등록증(법인사업자:본점)등록번호 :101-82-07976법인명(단체명):아름다운재단대표자 :한찬희개업연월일:2002년10월17 일법인등록번호:110122-0032797사업장소재지:서울특별시종로구자하문로19길6(옥인동)본점소재지:서울특별시종로구자하문로19길6(옥인동)REER사업의종류:업태소매종목재활용품제조출판서비스광고업OFTANAT발급사유:재출력희망 (컬러출)N국세청KOREA사업자단위과세적용사업자 여부:여()부(V)전자세금계산서전용전자우편주소:2019년07 월 22일종로세무서장국세청국세청Service';

// 안됨 - 문자들이 분리되서 식별
const txtData2 = [
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '국세청',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업자등록증',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: 'us.oa.kr',
    inferConfidence: 0.6777,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '(',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '법인사업자',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ')',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '등록번호 :',
    inferConfidence: 0.9195,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '104-86-53569',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '법인명(단체명)',
    inferConfidence: 0.9513,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9992,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '(주)',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '리그라운드',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '대',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '표',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '자',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9971,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '서성덕,',
    inferConfidence: 0.9805,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '임윤희',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '(각자대표)',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '개',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '업연월일',
    inferConfidence: 0.9954,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9984,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '2014',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '년',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '02',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '월',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '20',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '일',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '법인등록번호',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '110111-5337765',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업장',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '소재지',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9991,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '서울특별시',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '중구',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '동호로',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '387-2,',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '1,3,5층(방산동)',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '본점소재지',
    inferConfidence: 0.9783,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9989,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '서울특별시',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '중구',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '동호로',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '387-2,',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '1,3,5층(방산동)',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업의',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '종 류',
    inferConfidence: 0.8598,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '업태',
    inferConfidence: 0.9978,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '제조업',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '종목',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '생분해성',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '제품',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '포장자재',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '도소매',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '일회용품,',
    inferConfidence: 0.9978,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '포장자재',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '발',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '급',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '유',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '정정',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '국',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '세 청',
    inferConfidence: 0.9825,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업자',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '단위',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '과세',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '적용사업자',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '여부',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9983,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '여(',
    inferConfidence: 0.9857,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ')',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '부(V)',
    inferConfidence: 0.99,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '전자세금계산서',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '전용',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '전자우편주소',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9986,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '2019',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '년',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '06',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '월',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '26',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '일',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '중부세무서장',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '국세청',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: 'National TaxService',
    inferConfidence: 0.9936,
  },
];
const txtDataToJoin2 =
  '국세청사업자등록증us.oa.kr(법인사업자)등록번호 :104-86-53569법인명(단체명):(주)리그라운드대표자:서성덕임윤희(각자대표)개업연월일:2014년02월20일법인등록번호:110111-5337765사업장소재지:서울특별시중구동호로387-2135층(방산동)본점소재지:서울특별시중구동호로387-2135층(방산동)사업의종 류:업태제조업종목생분해성제품포장자재도소매일회용품포장자재발급사유:정정국세 청사업자단위과세적용사업자여부:여()부(V)전자세금계산서전용전자우편주소:2019년06월26일중부세무서장국세청National TaxService';
// 됨 - ocr1.jpg
const txtData3 = [
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '국세청',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업자등록증',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: 'ntoolk',
    inferConfidence: 0.5316,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '(',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '법인사업자',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ')',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '등록번호:',
    inferConfidence: 0.9035,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '214-87-39314',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '법인명(단체명)',
    inferConfidence: 0.9621,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '드림에이피에스',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '주식회사',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '대',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '표',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '자',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '김현권',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '개업연월일:',
    inferConfidence: 0.9648,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '2003',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '년',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '08',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '월',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '05 일',
    inferConfidence: 0.9904,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '법인등록번호:',
    inferConfidence: 0.9509,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '110111-2835209',
    inferConfidence: 0.9965,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업장',
    inferConfidence: 0.9993,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '소재지',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '서울특별시',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '마포구',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '월드컵로',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '96,',
    inferConfidence: 0.9481,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '4층(서교동,',
    inferConfidence: 0.9988,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '영훈빌딩)',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '본점소재지',
    inferConfidence: 0.9132,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9999,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '서울특별시',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '마포구',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '월드컵로',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '96.',
    inferConfidence: 0.9738,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '4층(서교동,',
    inferConfidence: 0.9991,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '영훈빌딩)',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업의',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '종류:',
    inferConfidence: 0.8368,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '업태',
    inferConfidence: 0.9877,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '건설',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '종목',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '철물공사',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '건설',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '기계설비공사',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '서비스',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '기타도급',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: 'TEL',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '02-323-3261',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '발',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '급',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '유 :',
    inferConfidence: 0.8629,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: 'FAX',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '02-323-3610',
    inferConfidence: 0.9997,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '국',
    inferConfidence: 0.9998,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: 'MAIL:',
    inferConfidence: 0.9794,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: 'draps@draps.co.kr',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '사업자',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '단위',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '과세',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '적용사업자',
    inferConfidence: 0.9996,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '여부',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '여(',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ')부(V)',
    inferConfidence: 0.9456,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '전자세금계산서',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '전용',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '전자우편주소',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: ':',
    inferConfidence: 0.9994,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '2020',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '년',
    inferConfidence: 1,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '06월',
    inferConfidence: 0.843,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '16 일',
    inferConfidence: 0.9719,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '마포세무서장',
    inferConfidence: 0.9995,
  },
  {
    valueType: 'ALL',
    boundingPoly: { vertices: [Array] },
    inferText: '국세청',
    inferConfidence: 0.9997,
  },
];
const txtDataToJoin3 =
  '국세청사업자등록증ntoolk(법인사업자)등록번호:214-87-39314법인명(단체명):드림에이피에스주식회사대표자:김현권개업연월일:2003년08월05 일법인등록번호:110111-2835209사업장소재지:서울특별시마포구월드컵로964층(서교동영훈빌딩)본점소재지:서울특별시마포구월드컵로96.4층(서교동영훈빌딩)사업의종류:업태건설종목철물공사건설기계설비공사서비스기타도급TEL:02-323-3261발급사유 :FAX:02-323-3610국MAIL:draps@draps.co.kr사업자단위과세적용사업자여부:여()부(V)전자세금계산서전용전자우편주소:2020년06월16 일마포세무서장국세청';
export default function Test() {
  const timestamp = new Date().getTime();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageExt, setImageExt] = useState<string>('');

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
      filteredText.push(el.inferText);
    });

    const regex = /[^0-9]/g;
    const res = filteredText.join().replaceAll(',', '').replaceAll(' ', '');
    console.log(res);
    // 개업연월일 가져옴
    const regDate = /([0-9]{4})년([0-1][0-9])월([0-3][0-9])일/;
    console.log(res.match(regDate)[0].replace(regex, ''));
    // 사업자 등록번호 가져옴
    const regNum = /([0-9]{3})-([0-9]{2})-([0-9]{5})/;
    console.log(res.match(regNum)[0].replaceAll('-', ''));

    //이름 가져옴
    console.log(res.indexOf('대표자:'));
    const idx = res.indexOf('대표자:');
    // 59
    console.log(res.substr(idx + 4, 3));
  };

  // 등록번호 idx+1 = 사업자 등록번호
  // 개업연월일 idx-1 = 이름
  // 개업연월일 idx ~ 법인등록번호 idx = 날짜
  // 법인등록번호 || 법인등록번호
  // const resultTxt = (txtData: any) => {
  //   const filteredText: any = [];
  //   const regex = /[^0-9]/g;
  //   let startDateIndex: number = 0;
  //   let endDateIndex: number = 0;
  //   let date = '';

  //   txtData.forEach((el: any, idx: number) => {
  //     if (el.inferText === '등록번호 :' || el.inferText === '등록번호:') {
  //       console.log('등록번호', txtData[idx + 1].inferText);
  //       filteredText.push(txtData[idx + 1].inferText.replaceAll('-', ''));
  //     } else if (
  //       el.inferText === '개업년월일:' ||
  //       el.inferText === '개업연월일:'
  //     ) {
  //       console.log('name', txtData[idx - 1].inferText);
  //       console.log('startDateIdx', idx);

  //       filteredText.push(txtData[idx - 1].inferText);
  //       startDateIndex = idx + 1;
  //     } else if (
  //       el.inferText === '법인등록번호:' ||
  //       el.inferText === '법인등록번호'
  //     ) {
  //       console.log('endDateIdx', idx);
  //       endDateIndex = idx;
  //     }
  //   });
  //   for (let i = startDateIndex; i < endDateIndex; i++) {
  //     date += txtData[i].inferText;
  //   }
  //   console.log('date', date);
  //   const regexedDate = date.replace(regex, '');
  //   console.log('regexedDate', regexedDate);
  //   filteredText.push(regexedDate);
  //   console.log(filteredText);
  //   //console.log(txtData);
  // };
  return (
    <>
      <input type="file" accept="image/*" onChange={onImageChange} />
      <button onClick={onOcr}>Ocr</button>
      <button onClick={() => resultTxt(txtData3)}>result</button>
    </>
  );
}
