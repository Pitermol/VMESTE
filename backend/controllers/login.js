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


export function login(req, res) {
    const signature = "VMESTE_jwt_key_BMSTU1830";
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    (async() => {
        const client = await getClient();
        const pk = req.body.public_key;
        const password = req.body.private_key;
        var query = `SELECT uid, email, password FROM Users WHERE email = '${pk}' OR login = '${pk}'`;
        var res1 = await client.query(query);
        res1 = res1["rows"];
        if (res1.length == 0) {
        return res.json({ status: 1 })
        }
        if (res1[0]["password"] == password) {
        const data =  {
            uid: res1[0]["uid"],
            email: res1[0]["email"]
        };
        jwt.sign({ data } , signature ,{ expiresIn: "1d" }, (err, token) => {
            if(err){
            return res.sendStatus(500);
            }
            else{
            return res.json({ status: 0, token: token, uid: res1[0]["uid"] });
            }
        });
        } else {
        return res.json({ status: 2 })
        }
        await client.end();
    })();
}