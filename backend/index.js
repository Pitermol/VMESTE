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

app.get("/api/get_public_info", (req, res) => {
  // console.log(req);
  if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
  const uid = req.headers["uid"];
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
    query = `SELECT nickname, login, avatar FROM Users WHERE uid = ${uid}`
    res1 = await client.query(query);
    await client.end();
    res1 = res1["rows"];
    if (res1.length == 0) {
      return res.json({ status: 1 })
    } else {
      return res.json({ status: 0, nickname: res1[0]["nickname"], login: res1[0]["login"], avatar: res1[0]["avatar"], subs: subs, posts: posts, place: top_place })
    }
  })();
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
    await client.end();
    // console.log(res1);
  })();
  res.json({status: 0});
});

app.get("/api/checkjwt", (req, res) => {
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
})

app.post("/api/login", jsonParser, (req, res) => {
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
      await client.end();
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
  })();
})

app.post("/api/create_post", jsonParser, (req, res) => {
  if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
  (async() => {
    const client = await getClient();
    const uid = req.body.uid;
    const text = req.body.text;
    const coords = req.body.coords;
    var query = `SELECT post_id FROM Posts ORDER BY post_id DESC`;
    var res1 = await client.query(query);
    res1 = res1["rows"];
    var post_id;
    if (res1.length == 0) {
      post_id = 0;
    } else {
      post_id = res1[0]["post_id"] + 1;
    }
    if (coords != []) {
      var query = `INSERT INTO Posts("post_id", "post_owner", "text", "location", "likes") VALUES (${post_id}, ${uid}, '${text}', point(${coords[0]}, ${coords[1]}), 0)`;
      await client.query(query);
    } else {
      var query = `INSERT INTO Posts("post_id", "post_owner", "text", "likes") VALUES (${post_id}, ${uid}, '${text}', 0)`;
      await client.query(query);
    }
    var query = `UPDATE Scores SET score = score + 3 WHERE uid = ${uid}`;
    await client.query(query);

    await client.end();
    return res.json({ status: 0 });
  })();
})

app.post("/api/subscribe", jsonParser, (req, res) => {
  if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
  (async() => {
    const client = await getClient();
    const target = req.body.target;
    const subscriber = req.body.subscriber;
    console.log(target, subscriber);
    var query = `INSERT INTO Subscribers(target, subscriber) VALUES (${target}, ${subscriber})`;
    await client.query(query);
    var query = `UPDATE Scores SET score = score + 1 WHERE uid = ${target}`;
    await client.query(query);
    
    await client.end();
    return res.json({ status: 0 });
  })();
})

app.post("/api/unsubscribe", jsonParser, (req, res) => {
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
})

app.post("/api/check_if_subscribed", jsonParser, (req, res) => {
  if (req.headers.authorization != process.env.TOKEN) return res.sendStatus(401);
  (async() => {
    const client = await getClient();
    const target = req.body.target;
    const subscriber = req.body.subscriber;
    var query = `SELECT * FROM Subscribers WHERE target = ${target} AND subscriber = ${subscriber}`;
    var res1 = await client.query(query);
    await client.end();
    if (res1["rows"].length == 0) {
      return res.json({ status: 0, if_subscribed: false });
    } else {
      return res.json({ status: 0, if_subscribed: true });
    }
  })();
})

app.post("/api/check_existance", jsonParser, (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
