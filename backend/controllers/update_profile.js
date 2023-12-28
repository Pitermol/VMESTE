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


export function update_profile(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    (async() => {
      const client = await getClient();
      const uid = req.body.uid;
      const password = req.body.pass;
      const nickname = req.body.nickname;
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      if (password == "" && nickname == "" && first_name == "" && last_name == "") {
        return res.json({ status: 0 })
      }
      var query = `UPDATE Users SET password = ${password == "" ? "password" : "'" + password + "'"},
      nickname = ${nickname == "" ? "nickname" : "'" + nickname + "'"},
      first_name = ${first_name == "" ? "first_name" : "'" + first_name + "'"}, 
      last_name = ${last_name == "" ? "last_name" : "'" + last_name + "'"} WHERE uid = ${uid}`;
      await client.query(query);
      await client.end();
      return res.json({ status: 0 })
    })();
}