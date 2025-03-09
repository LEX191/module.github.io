const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('./models/User'); // Adjust the path to your User model
const app = express();

app.use(express.json());

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) { // Implement comparePassword method
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Successful login logic here
  res.json({ message: 'Login successful' });
});

// Password reset request
app.post('/reset-request', async (req, res) => {
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Send email with reset link
  const transporter = nodemailer.createTransport({
    // Your email service configuration
  });

  const resetLink = `http://yourdomain.com/reset-password?token=${resetToken}`;
  await transporter.sendMail({
    to: email,
    subject: 'Password Reset',
    text: `Click the link to reset your password: ${resetLink}`
  });

  res.json({ message: 'Reset link sent to your email' });
});
