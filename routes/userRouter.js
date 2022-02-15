const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "lifechoices",
  password: "@Lifechoices1234",
  database: "personal_blog",
});

// USER REGISTRATION
router.post('/', (req, res) => {
    const {name, email, contact, password} = req.body;
    if (!name || !email || !contact || !password)
    res.status(400).send({ msg: "Not all fields have been submitted" })
    var sql = `INSERT INTO users (user_name, user_email, user_contact, user_password) VALUES ('${name}', '${email}', '${contact}', '${password}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})

// GET ALL USERS
router.get('/', (req, res, next)=>{
  var sql = `SELECT * FROM users`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

// GET ONE
router.get('/:id', (req, res, next)=>{
  var sql = `SELECT * FROM users WHERE user_id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

// SIGN IN USER
router.patch("/", (req, res) => {
  const { email, password } = req.body;
  var sql = `SELECT * FROM users WHERE user_email='${email}' AND user_password='${password}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

// DELETE ONE
router.delete('/:id', (req, res, next)=>{
  var sql = `DELETE FROM users WHERE user_id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

//UPDATE
router.put('/:id', (req, res, next)=>{
  const {name, email, contact, password, avatar, about} = req.body;

  let sql = "UPDATE users SET ";

  if (name) {sql += `user_name='${ name }',`} ;
  if (email) {sql += `user_email='${ email }',`} ;
  if (contact) {sql += `user_contact='${ contact }',`} ;
  if (password) {sql += `user_password='${ password }',`} ;
  if (avatar) {sql += `user_avatar='${ avatar }',`} ;
  if (about) {sql += `user_about='${ about }',`} ;
  if (sql.endsWith(',')) sql = sql.substring(0, sql.length-1), 

  sql += `WHERE user_id='${req.params.id}'` 

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send(result)
  });
})

module.exports = router;