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


export function create_post(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    (async() => {
        const client = await getClient();
        const uid = req.body.uid;
        const text = req.body.text;
        const coords = req.body.coords;
        var query = `SELECT post_id FROM Posts ORDER BY post_id DESC`;
        var res1 = await client.query(query);
        res1 = res1["rows"];
        var post_id;
        if (res1.length == 0) {
        post_id = 0;
        } else {
        post_id = res1[0]["post_id"] + 1;
        }
        if (coords != []) {
        var query = `INSERT INTO Posts("post_id", "post_owner", "text", "location", "likes") VALUES (${post_id}, ${uid}, '${text}', point(${coords[0]}, ${coords[1]}), 0)`;
        await client.query(query);
        } else {
        var query = `INSERT INTO Posts("post_id", "post_owner", "text", "likes") VALUES (${post_id}, ${uid}, '${text}', 0)`;
        await client.query(query);
        }
        var query = `UPDATE Scores SET score = score + 3 WHERE uid = ${uid}`;
        await client.query(query);

        await client.end();
        return res.json({ status: 0 });
    })();
}