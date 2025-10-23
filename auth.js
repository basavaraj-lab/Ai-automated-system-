// Frontend Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGN5ryrGVXsDyTgdZEqZ_KDtmWFD62HbQ",
  authDomain: "ai-automated-response-system.firebaseapp.com",
  projectId: "ai-automated-response-system",
  storageBucket: "ai-automated-response-system.appspot.com",
  messagingSenderId: "86554194223",
  appId: "1:86554194223:web:3ff97b9ae88eb7ac7a31da",
  measurementId: "G-473RQ19X92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const toggleForm = document.getElementById('toggleForm');
const formTitle = document.getElementById('formTitle');
const message = document.getElementById('message');

let isSignUp = true;

// Toggle between Sign Up and Sign In
toggleForm.addEventListener('click', () => {
  isSignUp = !isSignUp;
  formTitle.textContent = isSignUp ? 'Sign Up' : 'Sign In';
  submitBtn.textContent = isSignUp ? 'Sign Up' : 'Sign In';
  toggleForm.textContent = isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up';
  message.textContent = '';
});

// Handle form submission
submitBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    if (isSignUp) {
      // Sign Up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      message.textContent = '✅ Verification email sent! Please check your inbox.';
      message.style.color = 'green';
    } else {
      // Sign In
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.emailVerified) {
        window.location.href = 'dashBord.html';
      } else {
        message.textContent = '❌ Please verify your email before signing in.';
        message.style.color = 'red';
      }
    }
  } catch (error) {
    message.textContent = '❌ ' + error.message;
    message.style.color = 'red';
  }
});