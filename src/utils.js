import { adjectives, nouns } from "./words";

import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path : path.resolve(__dirname, ".env")
});

import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

const sendMail = email => {
    const options = {
      auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENGRID_PASSWORD
      }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
  };
  
  export const sendSecretMail = (adress, secret) => {
    const email = {
      from: "dudfhd705@gmail.com",
      to: adress,
      subject: "🔒Login Secret for Prismagram🔒",
      html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
  };

  // jsonwebtoken 모듈을 통해 토큰 생성
  export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);