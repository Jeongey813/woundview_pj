import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwj3UkQnsQz_9C3NPteVVDKo4ZrUnm8ns",
    authDomain: "woundview.firebaseapp.com",
    projectId: "woundview",
    storageBucket: "woundview.firebasestorage.app",
    messagingSenderId: "492994656449",
    appId: "1:492994656449:web:bfc04990acaa32b918fc40"
  };

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Auth 인스턴스 생성
export const auth = getAuth(app);

// Firebase 앱 인스턴스도 export (필요시 사용)
export default app; 