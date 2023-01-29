const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const Pool = require("pg").Pool;

const db = mysql.createPool({
  host: process.env.MYSQL_HOST, // the host name MYSQL_DATABASE: node_mysql
  user: process.env.MYSQL_ROOT, // database user MYSQL_USER: MYSQL_USER
  password: process.env.MYSQL_PASSWORD, // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: process.env.MYSQL_DATABASE, // database name MYSQL_HOST_IP: mysql_db
});
//POSTGRES DB
// const pool = new Pool({
//     user: 'my_user',
//     host: 'localhost',
//     database: 'my_database',
//     password: 'root',
//     port: 5432,
//   });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi There");
});

app.get("/get", (req, res) => {
  const SelectQuery = " SELECT * FROM test_db";
  db.query(SelectQuery, (err, result) => {
    res.send(result);
  });
});

//INSERT QUERY NEEDS TO BE CHANGED DEPENDING ON WHAT WE NEED FOR NOW INSET NAME AND CONTINENT

app.post("/insert", (req, res) => {
  const countryName = req.body.setCountryName;
  const countryReview = req.body.setCountryReview;
  const InsertQuery =
    "INSERT INTO test_db (country, review) VALUES (?, ?)";
  db.query(InsertQuery, [countryName, countryReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/delete/:countryId", (req, res) => {
  const countryId = req.params.countryId;
  const DeleteQuery = "DELETE FROM test_db WHERE id = ?";
  db.query(DeleteQuery, countryId, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/update/:countryId", (req, res) => {
    const countryReview = req.body.reviewUpdate;
    const countryId = req.params.countryId;
    const UpdateQuery = "UPDATE test_db SET review = ? WHERE id = ?";
    db.query(UpdateQuery, [countryReview, countryId], (err, result) => {
      if (err) console.log(err)
    })
  })


app.listen('3001', () => { })