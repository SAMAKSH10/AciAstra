// utils/sendOtp.js
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOtp = (phone, otp) => {
  client.messages
    .create({
      body: `Your verification code is ${otp}`,
      from: process.env.OTP_NUMBER,  // Twilio phone number
      to: phone
    })
    .then(message => console.log('OTP sent:', message.sid))
    .catch(error => console.error('Error sending OTP:', error));
};

module.exports = sendOtp;
