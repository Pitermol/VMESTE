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


export function like_post(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    (async() => {
        const client = await getClient();
        const post_id = req.body.post_id;
        const post_owner = req.body.post_owner;
        const uid = req.body.uid;
        const is_plus = req.body.is_plus;
        var query;
        if (is_plus) {
            query = `UPDATE Posts SET likes = likes || '{${uid}}' WHERE post_id = ${post_id}`;
        } else {
            query = `UPDATE posts set likes = (select array_diff FROM array_diff((SELECT likes from posts where post_id = ${post_id}), '{${uid}}')) WHERE post_id = ${post_id}`;
        }
        await client.query(query);
        if (is_plus) {
            query = `UPDATE Scores SET score = score + 1 WHERE uid = ${post_owner}`;
        } else {
            query = `UPDATE Scores SET score = score - 1 WHERE uid = ${post_owner}`;
        }
        await client.query(query);
        await client.end();
        return res.json({ status: 0 })
    })();
}