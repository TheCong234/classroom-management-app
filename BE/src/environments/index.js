const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const jwtSecretKey = process.env.JWT_SECRET;

const mailerEnvironments = {
  MAILER: process.env.MAIL_MAILER,
  HOST: process.env.MAIL_HOST,
  PORT: process.env.MAIL_PORT,
  USERNAME: process.env.MAIL_USERNAME,
  PASSWORD: process.env.MAIL_PASSWORD,
  ENCRYPTION: process.env.MAIL_ENCRYPTION,
  FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
  FROM_NAME: process.env.MAIL_FROM_NAME,
};

export { mailerEnvironments };

export { accountSid, authToken, phoneNumber, jwtSecretKey };
