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


export function checkjwt(req, res) {
    const signature = "VMESTE_jwt_key_BMSTU1830";
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log(req.headers);
    if (token == null) {
        console.log(1);
        return res.json({ status: 1 });
    }
    jwt.verify(token, signature, (err, user) => {
        if (err) {
        console.log(err);
        return res.json({ status: 1 });
        } else {
        return res.json({ status : 0, data: user })
        }
    });
}