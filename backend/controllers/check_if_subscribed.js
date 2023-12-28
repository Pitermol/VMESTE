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


export function check_if_subscribed(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    (async() => {
        const client = await getClient();
        const target = req.body.target;
        const subscriber = req.body.subscriber;
        if (target == undefined | subscriber == undefined) {
            return res.json({ status: 1 })
        }
        var query = `SELECT * FROM Subscribers WHERE target = ${target} AND subscriber = ${subscriber}`;
        var res1 = await client.query(query);
        await client.end();
        if (res1["rows"].length == 0) {
        return res.json({ status: 0, if_subscribed: false });
        } else {
        return res.json({ status: 0, if_subscribed: true });
        }
    })();
}