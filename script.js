import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGN5ryrGVXsDyTgdZEqZ_KDtmWFD62HbQ",
  authDomain: "ai-automated-response-system.firebaseapp.com",
  projectId: "ai-automated-response-system",
  storageBucket: "ai-automated-response-system.appspot.com",
  messagingSenderId: "86554194223",
  appId: "1:86554194223:web:3ff97b9ae88eb7ac7a31da",
  measurementId: "G-473RQ19X92"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth check
onAuthStateChanged(auth, (user) => {
  if (user && user.emailVerified) {
    document.getElementById("email").value = user.email;
  } else {
    window.location.href = "index.html";
  }
});

// Provide navigation functions for dashboard buttons
window.navigateToEnquiries = function() {
  // navigate to the enquiries page (file is enquiry.html)
  window.location.href = 'enquiry.html';
};

window.goBack = function() {
  window.location.href = 'dashBord.html';
};

import { trackEnquiry, trackResponse } from './analytics.js';

// Enquiry form
const enquiryForm = document.getElementById("enquiryForm");
const responseBox = document.getElementById("responseBox");
const responseText = document.getElementById("responseText");

enquiryForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  try {
    // Track enquiry
    trackEnquiry(name, email, message);

    const res = await fetch("http://localhost:5001/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    responseBox.classList.remove("hidden");
    responseText.textContent = data.reply;

    // Track response
    trackResponse(data.reply);
  } catch (err) {
    responseText.textContent = "❌ Failed to send enquiry.";
    responseBox.classList.remove("hidden");
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});
