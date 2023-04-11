import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyAcPq_oMz78cX9GIVITJVU3GEVmvRgXcIk",
    authDomain: "devchallenges-authentica-74344.firebaseapp.com",
    projectId: "devchallenges-authentica-74344",
    storageBucket: "devchallenges-authentica-74344.appspot.com",
    messagingSenderId: "63425547753",
    appId: "1:63425547753:web:b901739f4b3c916ccacf78"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const facebookProvider = new FacebookAuthProvider(app)
export const githubProvider = new GithubAuthProvider(app)
export const Firestore = getFirestore(app)

export const storage = getStorage(app)