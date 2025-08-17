import nodeMailer from "nodemailer";
import { mailerEnvironments } from "../environments/index.js";

const contentEmailTemplate = (to, accessCode) => {
  return ` 
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Access code to Skipli Class</title>
      </head>
      <body style="font-family: sans-serif;">
        <h1 style="color: #FFA900; font-size: 32px' font-weight: 600;">Skipli Company</h1>
        <hr style="height: 8px; background-color: #ccc;  border: none" />
        <p>hello <strong>${to},</strong></p>
        <p>Please enter this code to access class.</p>
        <p>do not share the code with anyone</p>
        <div style="display: flex; justify-content: center;">
          <div style="border-radius: 8px; padding: 8px 18px; font-size: 32px; font-weight: 600; color: #fff; background-color: #00466A">${accessCode}</div>
        </div>  
        <hr style="height: 8px; background-color: #ccc;  border: none""/>
      </body>
    </html>`;
};

const signinLinkEmailTemplate = (to) => {
  return ` 
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Signin link to Skipli Class</title>
      </head>
      <body style="font-family: sans-serif;">
        <h1 style="color: #FFA900; font-size: 32px' font-weight: 600;">Skipli Company</h1>
        <hr style="height: 8px; background-color: #ccc;  border: none" />
        <p>hello <strong>${to},</strong></p>
        <p>Please follow this link to signin page and verify your email to start using class.</p> 
        <div style="display: flex; justify-content: center;">
          <p>${process.env.ORIGIN_CORS_CLIENT}/email-signin</p>
        </div>  
        <hr style="height: 8px; background-color: #ccc;  border: none""/>
      </body>
    </html>`;
};

const onSendEmail = (to, subject, template) => {
  const transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mailerEnvironments.USERNAME,
      pass: mailerEnvironments.PASSWORD,
    },
  });

  const options = {
    from: mailerEnvironments.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: template,
  };
  return new Promise((resolve, reject) => {
    transport.sendMail(options, (error, info) => {
      if (error) {
        console.log("Error send email:", error);
        reject({ success: false, error: error.message });
      } else {
        console.log("Send email success:", info.response);
        resolve({ success: true, response: info.response });
      }
    });
  });
};

const sendAccessCodeToEmail = async (email, subject = "Access code to Classroom", accessCode) => {
  try {
    const template = contentEmailTemplate(email, accessCode);
    const result = await onSendEmail(email, subject, template);
    return result;
  } catch (error) {
    console.error("Error in sendAccessCodeToEmail:", error);
    throw error;
  }
};

const sendAccessLinkToEmail = async (email, subject = "Link to Classroom") => {
  try {
    const template = signinLinkEmailTemplate(email);
    const result = await onSendEmail(email, subject, template);
    return result;
  } catch (error) {
    console.error("Error in sendAccessLinkToEmail:", error);
    throw error;
  }
};

export { sendAccessCodeToEmail, sendAccessLinkToEmail };
