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


export function get_last_posts(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    let start = req.headers.start;
    (async() => {
        const client = await getClient();
        var query = `SELECT * FROM Posts WHERE post_id <= (SELECT MAX(post_id) FROM Posts) - ${start} ORDER BY post_id DESC LIMIT 7`
        var res1 = await client.query(query);
        res1 = res1["rows"]
        await client.end();
        return res.json({ status: 0, data: res1 });
    })();
}