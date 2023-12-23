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


export function check_password(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    (async() => {
      const client = await getClient();
      const uid = req.body.uid;
      const password = req.body.pass;
      var query = `SELECT password FROM Users WHERE uid = ${uid}`;
      var res1 = await client.query(query);
      await client.end();
      res1 = res1["rows"];
      if (res1.length == 0) {
        return res.json({ status: 1 })
      }
      if (res1[0]["password"] == password) {
        console.log(1);
        return res.json({ status: 0 })
      } else {
        return res.json({ status: 1 })
      }
    })();
}