import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import fsProm from 'fs/promises';
import nodemailer from "nodemailer";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'authorization': '123qwe'
    }
}

// let file = null;
// file = await fsProm.readFile( './logo192.png', "base64" );
// // console.log(file);
// const mimetype = "image/png";
// const data = { mimetype, file, authorization: "123qwe", uid: 2};
const data = {email: "Pitersham@gmail.com"}
axios.post( "http://localhost:3010/api/confirm_email", data, config).then(response => console.log(response.data));

// let transporter = nodemailer.createTransport({
//     host: 'smtp.yandex.ru',
//     port: 465,
//     secure: true,
//     auth: {
//         user: "poltermol",
//         pass: "zpxvckzdbnfpmrbe",
//     },
// });
//   await transporter.sendMail({
//     from: '"VMeste" <Poltermol@yandex.ru>',
//     to: 'Pitersham@gmail.com',
//     subject: 'Подтверждение пароля',
//     html: `<b>Приветствуем!</b> Код для подтверждения регистрации: <code style="font-size: 20px; font-weight: 700">${123456}</code>`,
// });
