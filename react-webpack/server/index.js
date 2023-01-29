const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const Pool = require("pg").Pool;

const db = mysql.createPool({
  host: "localhost", // the host name MYSQL_DATABASE: node_mysql
  user: "root", // database user MYSQL_USER: MYSQL_USER
  password: "password123", // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: "world", // database name MYSQL_HOST_IP: mysql_db
});

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
  const SelectQuery = " SELECT * FROM world.country";
  db.query(SelectQuery, (err, result) => {
    res.send(result);
  });
});

//INSERT QUERY NEEDS TO BE CHANGED DEPENDING ON WHAT WE NEED FOR NOW INSET NAME AND CONTINENT

app.post("/insert", (req, res) => {
  const countryName = req.body.setCountryName;
  const continent = req.body.setContinent;
  const InsertQuery =
    "INSERT INTO world.country (name, continent) VALUES (?, ?)";
  db.query(InsertQuery, [countryName, continent], (err, result) => {
    console.log(result);
  });
});

app.delete("/delete/:countryId", (req, res) => {
  const countryId = req.params.countryId;
  const DeleteQuery = "DELETE FROM world.country WHERE id = ?";
  db.query(DeleteQuery, countryId, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/update/:countryId", (req, res) => {
    const continent = req.body.continentUpdate;
    const countryId = req.params.countryId;
    const UpdateQuery = "UPDATE world.country SET continent = ? WHERE id = ?";
    db.query(UpdateQuery, [continent, countryId], (err, result) => {
      if (err) console.log(err)
    })
  })







app.listen('3001', () => { })