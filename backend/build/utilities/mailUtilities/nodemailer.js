"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const envKeys_1 = require("../../configurations/envKeys");
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: `${envKeys_1.GMAIL_USER}`,
        pass: `${envKeys_1.GMAIL_PASSWORD}`,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendMail = async (to, message, subject, actionLink, actionText) => {
    try {
        const mailOptions = {
            from: `${envKeys_1.GMAIL_USER}`,
            to,
            subject,
            html: `
        <div style="width: 60%; margin: 0 auto; text-align: center; padding: 20px; border-radius: 10px; border: 2px solid gold; background-color: #fffaf0; font-family: Arial, sans-serif;">
          <h3 style="font-size: 24px; color: #d2691e; margin-bottom: 10px;">Welcome to My Movie Shelf</h3>
          <p style="font-size: 18px; color: #8b4513; margin: 10px 0;">
            ${message}
          </p>
          ${actionLink ? `<a href="${actionLink}" style="text-decoration: none; color: white; display: inline-block; background-color: #27AE60; padding: 10px 20px; border-radius: 10px;">${actionText}</a>` : ""}
          <p style="font-size: 18px; color: #2e8b57; margin: 10px 0;">
            Thank You<br />
            <strong style="color: #ff4500;">My Movie Shelf Team</strong>
          </p>
        </div>
        `
        };
        const response = await transport.sendMail(mailOptions);
        return response;
    }
    catch (err) {
        console.error('Error sending email:', err.message);
        throw new Error(err.message);
    }
};
exports.default = {
    sendMail
};
// <img 
// src="https://res.cloudinary.com/dixoaggbe/image/upload/v1731841849/thumbs_up_gif.gif" 
// alt="Thumbs up" 
// style="width: 100px; height: auto; margin: 20px 0;" />
