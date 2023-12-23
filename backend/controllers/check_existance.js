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


export function check_existance(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    const login = req.body.login;
    const email = req.body.email;
    
    let res1;
    let res2;
    var query;
    (async () => {
        const client = await getClient();
        if (email != undefined) {
            query = `SELECT Uid FROM Users WHERE email = '${email}'`;
            res1 = await client.query(query);
            res1 = res1["rows"];
            if (res1.length != 0) {
                return res.json({ status: 1 });
            }
        }
        
        if (login != undefined) {
            query = `SELECT Uid FROM Users WHERE login = '${login}'`;
            res2 = await client.query(query);
            res2 = res2["rows"];
            if (res2.length != 0) {
                return res.json({ status: 2 });
            }
        }
        await client.end();
        return res.json({ status: 0 });
    })();
}