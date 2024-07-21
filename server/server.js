const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

const PORT = 5005;
let db;

const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/edit-appointment", (req, res) => {});

app.post("/remove-appointment", (req, res) => {
  if (ObjectId.isValid(req.body._id)) {
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
