// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const nodemailer = require('nodemailer');
// const fs = require('fs');

// const app = express();
// const PORT = 3000;

// // Users database (for demo, use JSON)
// let users = [
//     { email: "user@example.com", password: "123456" },
//     { email: "admin@example.com", password: "admin123" }
// ];

// // Store OTP temporarily
// let otps = {}; // { email: { code: 123456, expires: Date } }

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static(__dirname));

// // Nodemailer setup (Gmail example)
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'your-email@gmail.com', // replace with your email
//         pass: 'your-email-password'   // replace with your app password
//     }
// });

// // Serve index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Send OTP to email
// app.post('/send-otp', (req, res) => {
//     const { email } = req.body;
//     const user = users.find(u => u.email === email);
//     if(!user) return res.status(400).json({ error: "Email not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     otps[email] = { code: otp, expires: Date.now() + 5*60*1000 }; // expires in 5 min

//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: email,
//         subject: 'Password Reset OTP',
//         text: `Your OTP code is ${otp}. It is valid for 5 minutes.`
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//         if(err) return res.status(500).json({ error: err.message });
//         res.json({ message: 'OTP sent to your email' });
//     });
// });

// // Verify OTP and reset password
// app.post('/reset-password', (req, res) => {
//     const { email, otp, newPassword } = req.body;
//     const record = otps[email];
//     if(!record) return res.status(400).json({ error: 'OTP not requested' });

//     if(Date.now() > record.expires) return res.status(400).json({ error: 'OTP expired' });
//     if(record.code != otp) return res.status(400).json({ error: 'Invalid OTP' });

//     const user = users.find(u => u.email === email);
//     user.password = newPassword;

//     delete otps[email]; // remove OTP after successful reset
//     res.json({ message: 'Password reset successful!' });
// });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

// document.getElementById("enquiryForm").addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const message = document.getElementById("message").value.trim();

//   if (!name || !email || !message) {
//     alert("Please fill all fields!");
//     return;
//   }

//   try {
//     // Send data to server (API)
//     const response = await fetch("http://localhost:5000/api/enquiry", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, message }),
//     });

//     // Get JSON reply
//     const data = await response.json();

//     // Show AI reply
//     document.getElementById("responseBox").classList.remove("hidden");
//     document.getElementById("responseText").innerText = data.reply;

//     // Reset form
//     document.getElementById("enquiryForm").reset();

//   } catch (error) {
//     console.error("Error sending enquiry:", error);
//     alert("Server error. Please try again later.");
//   }
// });
