import { getClient } from '../client.js';
import express, { json } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export function register(req, res) {
    const signature = "VMESTE_jwt_key_BMSTU1830";
    if(!req.body) return res.sendStatus(400);
    if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    let avatar;
    var date = new Date(Date.now());
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.slice(-2, undefined) + ':' + seconds.slice(-2, undefined) + '+03';

    (async () => {
        const client = await getClient();

        var res1;
        var query;
        query = `SELECT uid FROM Users ORDER BY uid DESC`;
        res1 = await client.query(query);
        res1 = res1["rows"];
        var uid;
        if (res1.length == 0) {
        uid = 0;
        } else {
        uid = res1[0]["uid"] + 1;
        }
        
        fs.readFile('./avatars/default.png', (err, data) => {
        fs.writeFile(`./avatars/${uid}.jpg`, data, (err1) => {
            console.log(err1);
        })
        }); 

        query = `INSERT INTO Scores ("uid", "score") VALUES (${uid}, ${Math.floor(Date.now() / 1000)})`;
        await client.query(query);

        if (!nickname) {
        if (!first_name) {
            if (!last_name) {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "email", "login", "password", "reg_datetime") VALUES (${uid}, '${email}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "email", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${email}', '${login}', '${password}', '${avatar}', '${formattedTime}')`
            }
            } else {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "email", "last_name", "login", "password", "reg_datetime") VALUES (${uid}, '${email}', '${last_name}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "email", "last_name", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${email}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'), '${formattedTime}')`
            }
            }
        } else {
            if (!last_name) {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "email", "first_name", "login", "password", "reg_datetime") VALUES (${uid}, '${email}', '${first_name}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "email", "first_name", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${email}', '${first_name}', '${login}', '${password}', decode('${avatar}', 'hex'), '${formattedTime}')`
            }
            } else {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "email", "first_name", "last_name", "login", "password", "reg_datetime") VALUES (${uid}, '${email}', '${first_name}', '${last_name}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "email", "first_name", "last_name", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${email}', '${first_name}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'), '${formattedTime}')`
            }
            }
        }
        } else {
        if (!first_name) {
            if (!last_name) {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "nickname", "email", "login", "password", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "nickname", "email", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${login}', '${password}', decode('${avatar}', 'hex'), '${formattedTime}')`
            }
            } else {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "nickname", "email", "last_name", "login", "password", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${last_name}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "nickname", "email", "last_name", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'), '${formattedTime}')`
            }
            }
        } else {
            if (!last_name) {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "login", "password", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${login}', '${password}', decode('${avatar}', 'hex'), '${formattedTime}')`
            }
            } else {
            if (!avatar) {
                query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "last_name", "login", "password", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${last_name}', '${login}', '${password}', '${formattedTime}')`
            } else {
                query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "last_name", "login", "password", "avatar", "reg_datetime") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'), '${formattedTime}')`
            }
            }
        }
        }
        res1 = await client.query(query);
        res1 = res1["rows"];

        await client.end();
        const data =  {
        uid: uid,
        email: email
        };
        jwt.sign({ data } , signature, { expiresIn: "1d" }, (err, token) => {
            if(err){
                return res.json({ status: 1 });
            }
            else{
                return res.json({ status: 0, token: token, uid: uid });
            }
        });
    })();
}