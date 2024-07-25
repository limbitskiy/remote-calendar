const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const bcrypt = require("bcrypt");
const authMiddleware = require("./middleware/auth");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const cookieParser = require("cookie-parser");

const PORT = 5005;
let db;

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`Connection established on port ${PORT}`);
    });
    db = getDb();
  } else {
    console.error(err);
  }
});

app.post("/get-month", (req, res) => {
  const startDate = new Date(req.body.year, req.body.month, 1);
  const endDate = new Date(req.body.year, req.body.month + 1, 1);

  let results = [];

  const query = {
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  const options = {
    sort: { date: 1 },
  };

  db.collection("appointments")
    .find(query, options)
    .forEach((item) => results.push(item))
    .then(() => {
      res.status(200).json(results);
    });
});

app.post("/create-appointment", (req, res) => {
  let withDateObject;

  // convert to date object
  if (Date.parse(req.body.date)) {
    withDateObject = { ...req.body, date: new Date(req.body.date) };
  } else {
    res.status(500).json({ error: `Wrong date format` });
    return;
  }

  db.collection("appointments")
    .insertOne(withDateObject)
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(500).json({ error: `Could not create. Error: ${err}` }));
});

app.post("/update-appointment", (req, res) => {
  let withDateObject;

  if (Date.parse(req.body.payload.date)) {
    withDateObject = { ...req.body.payload, date: new Date(req.body.payload.date) };
  } else {
    res.status(500).json({ error: `Wrong date format` });
    return;
  }

  if (ObjectId.isValid(req.body._id)) {
    db.collection("appointments")
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: withDateObject })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: `Could not update document` });
      });
  }
});

app.post("/remove-appointment", (req, res) => {
  if (ObjectId.isValid(req.body._id)) {
    console.log(req.body._id);
    db.collection("appointments")
      .deleteOne({ _id: new ObjectId(req.body._id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: `Could not delete document` });
      });
  }
});

app.post("/login", (req, res) => {
  const pass = req.body.pass;

  if (pass) {
    const query = {
      login: "guest",
    };

    db.collection("auth")
      .findOne(query)
      .then((db) => {
        bcrypt.compare(pass, db?.pass, function (err, result) {
          if (result) {
            const token = jwt.sign({ id: "guest" }, secret, { expiresIn: "24h" });
            res.cookie("token", token, { httpOnly: false });
            res.status(200).json({ msg: `Login successfull` });
          } else {
            res.status(401).json({ msg: `Wrong password` });
          }
        });
      })
      .catch((err) => {
        res.status(400).json({ error: `Could not login` });
      });
  }
});
