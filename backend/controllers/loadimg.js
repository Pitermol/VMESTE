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


export function loadimg(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    let uid = req.headers.uid;
    let avatar = req.files.avatar;
    avatar.mv(`./avatars/${uid}.jpg`);
    return res.json({ status: 0 });
}