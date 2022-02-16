import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //console.log();
  // const MY_OCR_API_URL = process.env.NEXT_PUBLIC_MY_OCR_API_URL as string;
  const MY_OCR_API_URL =
    'https://bq2wquile8.apigw.ntruss.com/custom/v1/14231/6c9f7f0b6570661d9c230c35c51c19657e4b6bc82af76a6a2e4f77bdcc58e6cb/general';
  const MY_OCR_SECRET_KEY = 'VXRIRnhOYlJtd2dQck5TUkpodXNRTGdPUkFoeGpyTFI=';

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'X-OCR-SECRET': MY_OCR_SECRET_KEY,
    },
  };
  try {
    const data = await axios.post(MY_OCR_API_URL, req.body, headers);

    return res.status(200).json({ message: data.data.images[0].fields });

    //return res.status(200).json({ message: req.body });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}
