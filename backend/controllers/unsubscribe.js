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


export function unsubscribe(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    (async() => {
        const client = await getClient();
        const target = req.body.target;
        const subscriber = req.body.subscriber;
        var query = `DELETE FROM Subscribers WHERE target = ${target} AND subscriber = ${subscriber}`;
        await client.query(query);
        var query = `UPDATE Scores SET score = score - 1 WHERE uid = ${target}`;
        await client.query(query);
        
        await client.end();
        return res.json({ status: 0 });
    })();
}