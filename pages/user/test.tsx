import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import { getDateTime } from '@utils/function';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

type OcrData = {
  b_no: string;
  start_dt: string;
  p_nm: string;
};
export default function Test1() {
  const timestamp = new Date().getTime();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageExt, setImageExt] = useState<string>('');
  const [ocrData, setOcrData] = useState<OcrData>({
    b_no: '',
    start_dt: '',
    p_nm: '',
  });
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
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImageUrl(result.split(',')[1]);
    };
    setImageExt(e.target.value.split('.')[1]);
    e.target.value = '';
  };
  const onOcr = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/ocr', data);
      resultTxt(response.data.message);
    } catch (e) {
      console.error(e);
    }
  };
  const resultTxt = (data: any) => {
    // const res = data;
    const filteredText: any = [];
    data.forEach((el: any, idx: number) => {
      filteredText.push(el.inferText);
    });
    let startDTFilter;
    let nameFilterIdx;
    let p_nm;

    const res = filteredText.join().replaceAll(',', '').replaceAll(' ', '');
    console.log(res);

    // 사업자 등록번호 가져옴
    const regNum = /([0-9]{3})-([0-9]{2})-([0-9]{5})/;
    const b_no = res.match(regNum)[0].replaceAll('-', '');

    // 개업연월일 가져옴
    if (res.indexOf('개업연월일:') > 0) {
      startDTFilter = res.substr(res.indexOf('개업연월일:'));
    } else if (res.indexOf('개업년월일:') > 0) {
      startDTFilter = res.substr(res.indexOf('개업년월일:'));
    }

    const regex = /[^0-9]/g;
    const regDate = /([0-9]{4})년([0-1][0-9])월([0-3][0-9])일/;
    const start_dt = startDTFilter.match(regDate)[0].replace(regex, '');
    console.log(startDTFilter.match(regDate));

    //이름 가져옴
    if (res.indexOf('성명:') > 0) {
      console.log('성명');
      nameFilterIdx = res.indexOf('성명:');
      p_nm = res.substr(nameFilterIdx + 3, 3);
      console.log('idx', nameFilterIdx);
      console.log('p_nm', p_nm);
    } else if (res.indexOf('대표자:') > 0) {
      console.log('대표자');
      nameFilterIdx = res.indexOf('대표자:');
      p_nm = res.substr(nameFilterIdx + 4, 3);
      console.log('idx', nameFilterIdx);
    }
    const newOcrData = {
      ...ocrData,
      b_no,
      start_dt,
      p_nm,
    };
    setOcrData(newOcrData);
  };

  const validateData = async () => {
    const validateData = {
      businesses: [ocrData],
    };
    console.log(validateData);
    // // req data format
    // const validateData = {
    //   businesses: [
    //     {
    //       b_no: '8290700318',
    //       start_dt: '20160401',
    //       p_nm: '백재봉',
    //     },
    //   ],
    // };
    console.log('============');
    console.log(validateData);
    console.log('============');

    try {
      const data = await axios.post(
        'http://localhost:3000/api/validateOcrData',
        validateData,
      );
      console.log(data.data.message);
      if (data.data.message) {
        console.log('success');
      } else {
        console.log('failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={onImageChange} />
      <button onClick={onOcr}>Ocr</button>
      <button onClick={validateData}>result</button>
    </>
  );
}
