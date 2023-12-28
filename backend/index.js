import { getClient } from './client.js';
import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.test' });
import fsProm from 'fs/promises';
import nodemailer from "nodemailer";
import cors from "cors";
import jwt from 'jsonwebtoken';
import path from "path";
import formidable from 'express-formidable';
import fileUpload from 'express-fileupload';
import { register } from './controllers/registration.js';
import { login } from './controllers/login.js';
import { confirm_email } from './controllers/confirm_email.js';
import { update_profile } from './controllers/update_profile.js';
import { get_public_info } from './controllers/get_public_info.js';
import { get_avatar } from './controllers/get_avatar.js';
import { loadimg } from './controllers/loadimg.js';
import { add_email } from './controllers/add_email.js';
import { get_users_posts } from './controllers/get_users_posts.js';
import { checkjwt } from './controllers/checkjwt.js';
import { check_password } from './controllers/check_password.js';
import { create_post } from './controllers/create_post.js';
import { subscribe } from './controllers/subscribe.js';
import { unsubscribe } from './controllers/unsubscribe.js';
import { check_if_subscribed } from './controllers/check_if_subscribed.js';
import { check_existance } from './controllers/check_existance.js';
import { get_last_posts } from './controllers/get_last_posts.js';
import { like_post } from './controllers/like_post.js';


const app = express();

// app.use(formidable());
app.use(fileUpload());

const signature = "VMESTE_jwt_key_BMSTU1830";
const PORT = process.env.PORT || 3010;
app.use(cors());
const jsonParser = express.json();
const parseJSONReqBody = express.json({ limit: 2 * 1024 * 1024 });


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/api/confirm_email', jsonParser, confirm_email);

app.post("/api/like_post", jsonParser, like_post);

app.post("/api/update_profile", jsonParser, update_profile);

app.get("/api/get_public_info", get_public_info);

app.get('/api/get_avatar', get_avatar);

app.post('/api/loadimg', loadimg);

app.get('/api/add_email', add_email);

app.get('/api/get_users_posts', get_users_posts);

app.get('/api/get_last_posts', get_last_posts);

app.get("/api/checkjwt", checkjwt);

app.post("/api/check_password", jsonParser, check_password);

app.post("/api/login", jsonParser, login);

app.post("/api/create_post", jsonParser, create_post);

app.post("/api/subscribe", jsonParser, subscribe);

app.post("/api/unsubscribe", jsonParser, unsubscribe);

app.post("/api/check_if_subscribed", jsonParser, check_if_subscribed);

app.post("/api/check_existance", jsonParser, check_existance);

app.post('/api/registration', jsonParser, register);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
