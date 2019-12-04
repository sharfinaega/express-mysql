var express = require("express");
var router = express.Router();

const connection = require("../../config/db");

/* GET users listing. */
router.get("/", function(req, res, next) {
  connection.query(`select * from users`, (error, results, fields) => {
    if (error) {
      return res.status(404).send({
        message: "error when get user",
        error: error.sql
      });
    }
    res.status(200).send({
      message: "all users",
      results,
      fields
    });
  });
});

router.post("/", function(req, res, next) {
  const { name, email, password } = req.body;
  connection.query(`insert into users(name, email, password) values('${name}', '${email}', '${password}')`, (error, results, fields) => {
    if (error) {
      return res.status(404).send({
        message: "error when add user",
        error: error.sql
      });
    }
    res.status(200).send({
      message: "add user success",
      results,
      fields
    });
  });
});

router.put("/:id", function(req, res, next) {
  const { name, email, password } = req.body;
  const sql = `update users set name=?, email=?, password=? where id = ?`;
  const values = [name, email, password, req.params.id];
  pool.query(sql, values, (error, results) => {
    if (error) {
      return res.status(400).send({
        message: `error when update users`,
        error: error.sql
      });
    }
    res.status(200).send({
      message: `update id:${req.params.id} succeded`,
      results
    });
  });
});

router.delete("/", function(req, res, next) {
  const { id } = req.query;
  const newId = id.replace(/'/g, "");
  const sql = `delete from users where id in (${newId})`;
  connection.query(sql, (error, results) => {
    if (error) {
      return res.status(409).send({
        message: "error when delete multiple user",
        error: error.sql
      });
    }
    res.status(200).send({
      message: "delete user success",
      results
    });
  });
});

module.exports = router;
