// firebaseAdmin.ts

import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PRIVATE_KEY,
      clientEmail: process.env.NEXT_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  });
}

export { firebaseAdmin };
