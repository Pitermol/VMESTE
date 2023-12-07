import { getClient } from './client.js';
import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.test' });
import fsProm from 'fs/promises';
import nodemailer from "nodemailer";
import cors from "cors";
import jwt from 'jsonwebtoken';

const signature = "VMESTE_jwt_key_BMSTU1830";
const PORT = process.env.PORT || 3010;
const app = express();
app.use(cors());
const jsonParser = express.json();
const parseJSONReqBody = express.json({ limit: 2 * 1024 * 1024 });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/api/confirm_email', jsonParser, async (req, res) => {
  if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
  let ans = Math.floor(Math.random() * (999998 - 100000 + 1)) + 100000;
  let key = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: "poltermol",
        pass: "zpxvckzdbnfpmrbe",
    },
  });
  await transporter.sendMail({
    from: '"VMeste" <Poltermol@yandex.ru>',
    to: req.body.email,
    subject: 'Подтверждение регистрации',
    html: `<b>Приветствуем!</b> Код для подтверждения регистрации: <code style="font-size: 20px; font-weight: 700">${ans}</code>`,
  });
  ans = ans * (2 ** key);
  let response = {ans: ans, key: key};
  res.json(response);
})

app.post('/api/loadimg', parseJSONReqBody, async (req, res) => {
  if (req.body.authorization != process.env.TOKEN) return res.sendStatus(401);
  let uid = req.body.uid;
  const binaryData = Buffer.from( req.body.file, 'base64' );
  (async () => {
    const client = await getClient();
    var res1;
    var query;
    // query = `UPDATE Users SET avatar = bytea('logo192.png') WHERE uid = ${uid}`;
    query = `UPDATE Users SET avatar = $1::bytea WHERE uid = ${uid}`;
    res1 = await client.query(query, [binaryData]);
    console.log(res1);
  })();
  res.json({status: 0});
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(403);
  }
  jwt.verify(token, signature, (err, user) => {
    if (err) return res.sendStatus(404);
    req.user = user;

    next();
  });
}

app.post("/api/login", jsonParser, (req, res) => {
  if (req.body.authorization != process.env.TOKEN) return res.sendStatus(401);
  (async() => {
    const client = await getClient();
    const pk = req.body.public_key;
    const password = req.body.private_key;
    query = `SELECT uid, email, password FROM Users WHERE email = '${pk}' OR login = '${pk}'`;
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
      jwt.sign({ data } , signature ,{ expiresIn: 60 }, (err, token) => {
        if(err){
          return res.sendStatus(500);
        }
        else{
          res.json({ status: 0, token: token });
        }
      });
      await client.end();
    }
    return res.sendStatus(200);
  })();
})

app.post("/api/check_existance", jsonParser, (req, res) => {
  if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
  const login = req.body.login;
  const email = req.body.email;
  (async () => {
    const client = await getClient();

    var res1;
    var query;
    query = `SELECT Uid FROM Users WHERE email = '${email}'`;
    res1 = await client.query(query);
    res1 = res1["rows"];
    if (res1.length != 0) {
      res.json({ status: 1 });
      return res.sendStatus(200);
    }

    query = `SELECT Uid FROM Users WHERE login = '${login}'`;
    res1 = await client.query(query);
    res1 = res1["rows"];
    if (res1.length != 0) {
      res.json({ status: 2 });
      return res.sendStatus(200);
    }
    await client.end();
  })();
  res.json({ status: 0 });
  return res.sendStatus(200);
})

app.post('/api/registration', jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
  const login = req.body.login;
  const email = req.body.email;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  let avatar;

  (async () => {
    const client = await getClient();

    var res1;
    var query;
    query = `SELECT uid FROM Users ORDER BY uid DESC`;
    res1 = await client.query(query);
    res1 = res1["rows"];
    const uid = res1[0]["uid"] + 1;
    if (!nickname) {
      if (!first_name) {
        if (!last_name) {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "email", "login", "password") VALUES (${uid}, '${email}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "email", "login", "password", "avatar") VALUES (${uid}, '${email}', '${login}', '${password}', '${avatar}')`
          }
        } else {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "email", "last_name", "login", "password") VALUES (${uid}, '${email}', '${last_name}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "email", "last_name", "login", "password", "avatar") VALUES (${uid}, '${email}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'))`
          }
        }
      } else {
        if (!last_name) {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "email", "first_name", "login", "password") VALUES (${uid}, '${email}', '${first_name}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "email", "first_name", "login", "password", "avatar") VALUES (${uid}, '${email}', '${first_name}', '${login}', '${password}', decode('${avatar}', 'hex'))`
          }
        } else {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "email", "first_name", "last_name", "login", "password") VALUES (${uid}, '${email}', '${first_name}', '${last_name}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "email", "first_name", "last_name", "login", "password", "avatar") VALUES (${uid}, '${email}', '${first_name}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'))`
          }
        }
      }
    } else {
      if (!first_name) {
        if (!last_name) {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "nickname", "email", "login", "password") VALUES (${uid}, '${nickname}', '${email}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "nickname", "email", "login", "password", "avatar") VALUES (${uid}, '${nickname}', '${email}', '${login}', '${password}', decode('${avatar}', 'hex'))`
          }
        } else {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "nickname", "email", "last_name", "login", "password") VALUES (${uid}, '${nickname}', '${email}', '${last_name}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "nickname", "email", "last_name", "login", "password", "avatar") VALUES (${uid}, '${nickname}', '${email}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'))`
          }
        }
      } else {
        if (!last_name) {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "login", "password") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "login", "password", "avatar") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${login}', '${password}', decode('${avatar}', 'hex'))`
          }
        } else {
          if (!avatar) {
            query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "last_name", "login", "password", "avatar") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${last_name}', '${login}', '${password}')`
          } else {
            query = `INSERT INTO Users ("uid", "nickname", "email", "first_name", "last_name", "login", "password", "avatar") VALUES (${uid}, '${nickname}', '${email}', '${first_name}', '${last_name}', '${login}', '${password}', decode('${avatar}', 'hex'))`
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
    jwt.sign({ data } , signature, { expiresIn: 60 }, (err, token) => {
      if(err){
        console.log(err.message);
        return res.sendStatus(500);
      }
      else{
        res.json({ status: 0, token: token });
      }
    });
  })();
  
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
