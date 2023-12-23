import { getClient } from '../client.js';
import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env.test' });
import fsProm from 'fs/promises';
import nodemailer from "nodemailer";
import cors from "cors";
import jwt from 'jsonwebtoken';
import path from "path";
import formidable from 'express-formidable';
import fileUpload from 'express-fileupload';


export async function confirm_email(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    let ans = Math.floor(Math.random() * (999998 - 100000 + 1)) + 100000;
    let key = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: "poltermol",
            pass: "zpxvckzdbnfpmrbe",
        },
    });
    await transporter.sendMail({
        from: '"VMeste" <Poltermol@yandex.ru>',
        to: req.body.email,
        subject: 'Подтверждение регистрации',
        html: `<b>Приветствуем!</b> Код для подтверждения регистрации: <code style="font-size: 20px; font-weight: 700">${ans}</code>`,
    });
    ans = ans * (2 ** key);
    let response = {ans: ans, key: key};
    res.json(response);
}