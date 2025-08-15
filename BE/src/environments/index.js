const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const jwtSecretKey = process.env.JWT_SECRET;

export { accountSid, authToken, phoneNumber, jwtSecretKey };
