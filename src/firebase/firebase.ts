import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBCllSufTGXb4dplV5c_SH4QamU4WjVRlU',
  authDomain: 'kino-app-d1569.firebaseapp.com',
  projectId: 'kino-app-d1569',
  storageBucket: 'kino-app-d1569.appspot.com',
  messagingSenderId: '333690872279',
  appId: '1:333690872279:web:a997036a156f545d2dab92',
};
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
