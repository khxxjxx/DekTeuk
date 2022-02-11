import React, { useState } from 'react';
import { getStorage } from 'firebase/storage';
import fetch from 'isomorphic-unfetch';
import { InferGetServerSidePropsType } from 'next';

// export default function Test({ result }: { result: string }) {
//   return (
//     <>
//       <form>result</form>
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   console.log('server side');
//   return {
//     props: { result: 'asdasd' },
//   };
// }
