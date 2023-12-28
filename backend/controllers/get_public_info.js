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


export async function get_public_info(req, res) {
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    const uid = req.headers["uid"];
    if (uid == undefined) {
        return res.json({ status: 1 })
    };
    (async() => {
        const client = await getClient();
        var res1;
        var query;
        query = `SELECT COUNT(post_id) AS amount FROM Posts WHERE post_owner = ${uid}`
        res1 = await client.query(query);
        var posts = res1["rows"][0]["amount"]
        query = `SELECT COUNT(subscriber) AS amount FROM Subscribers WHERE target = ${uid}`
        res1 = await client.query(query);
        var subs = res1["rows"][0]["amount"]
        query = `SELECT COUNT(uid) + 1 AS place FROM Scores WHERE score > (SELECT score FROM Scores WHERE uid = ${uid})`
        res1 = await client.query(query);
        var top_place = res1["rows"][0]["place"];
        query = `SELECT nickname, login, first_name, last_name FROM Users WHERE uid = ${uid}`
        res1 = await client.query(query);
        await client.end();
        res1 = res1["rows"];
        if (res1.length == 0) {
        return res.json({ status: 1 })
        } else {
        return res.json({
            status: 0,
            nickname: (res1[0]["nickname"] == null ? "" : res1[0]["nickname"]),
            login: res1[0]["login"],
            first_name: (res1[0]["first_name"] == null ? "" : res1[0]["first_name"]), 
            last_name: (res1[0]["last_name"] == null ? "" : res1[0]["last_name"]), 
            subs: subs, 
            posts: posts, 
            place: top_place })
        }
    })();
}