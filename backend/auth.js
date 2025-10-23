// ✅ Import Firebase directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// ✅ Firebase Config (from your Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDGN5ryrGVXsDyTgdZEqZ_KDtmWFD62HbQ",
  authDomain: "ai-automated-response-system.firebaseapp.com",
  projectId: "ai-automated-response-system",
  storageBucket: "ai-automated-response-system.appspot.com",
  messagingSenderId: "86554194223",
  appId: "1:86554194223:web:3ff97b9ae88eb7ac7a31da",
  measurementId: "G-473RQ19X92"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const messageBox = document.getElementById("message");

let isSignUp = true;

// ✅ Toggle between Sign Up / Sign In
toggleForm.addEventListener("click", () => {
  isSignUp = !isSignUp;
  formTitle.textContent = isSignUp ? "Sign Up" : "Sign In";
  submitBtn.textContent = isSignUp ? "Sign Up" : "Sign In";
  toggleForm.textContent = isSignUp
    ? "Already have an account? Sign In"
    : "Don’t have an account? Sign Up";
  messageBox.textContent = "";
});

// ✅ Handle Sign Up / Sign In
submitBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  messageBox.style.color = "red";
  if (!email || !password) {
    messageBox.textContent = "⚠️ Enter email and password.";
    return;
  }

  try {
    if (isSignUp) {
      // 🟢 Sign Up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      messageBox.style.color = "green";
      messageBox.textContent = "✅ Verification email sent. Please check your inbox.";
    } else {
      // 🟢 Sign In
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        messageBox.style.color = "green";
        messageBox.textContent = "✅ Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "enquiry.html";
        }, 1500);
      } else {
        messageBox.textContent = "⚠️ Please verify your email first.";
        await signOut(auth);
      }
    }
  } catch (error) {
    console.error(error.code, error.message);

    switch (error.code) {
      case "auth/email-already-in-use":
        messageBox.textContent = "⚠️ Email already registered. Try signing in.";
        break;
      case "auth/user-not-found":
        messageBox.textContent = "⚠️ Account not found. Please sign up.";
        break;
      case "auth/wrong-password":
        messageBox.textContent = "⚠️ Incorrect password.";
        break;
      case "auth/invalid-email":
        messageBox.textContent = "⚠️ Invalid email format.";
        break;
      case "auth/weak-password":
        messageBox.textContent = "⚠️ Password must be at least 6 characters.";
        break;
      default:
        messageBox.textContent = "❌ " + error.message;
    }
  }
});
