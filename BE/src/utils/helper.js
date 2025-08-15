import crypto from "crypto";

const generateAccessCode = () => {
  return String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
};

function convertToE164(phone) {
  if (phone.startsWith("0")) {
    phone = "+84" + phone.slice(1);
  }
  return phone;
}

export { generateAccessCode, convertToE164 };
