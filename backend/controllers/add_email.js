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


export function add_email(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    let email = req.headers.email;
    (async() => {
        const client = await getClient();
        var query = `INSERT INTO emails (email) VALUES ('${email}')`
        await client.query(query);
        await client.end();
    })();
    return res.json({ status: 0 });
}