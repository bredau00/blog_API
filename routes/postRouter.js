const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "lifechoices",
  password: "@Lifechoices1234",
  database: "personal_blog",
});

// posting post
router.post('/', (req, res) => {
    const {title, body, date, author} = req.body;
    if (!title || !body || !date || !author)
    res.status(400).send({ msg: "Not all fields have been submitted" })
    var sql = `INSERT INTO posts (post_title, post_body, post_date, post_author) VALUES ('${title}', '${body}', '${date}', '${author}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})

// GET ALL posts
router.get('/', (req, res, next)=>{
  var sql = `SELECT * FROM posts`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

// GET ONE post
router.get('/:id', (req, res, next)=>{
  var sql = `SELECT * FROM posts WHERE post_id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

// DELETE ONE
router.delete('/:id', (req, res, next)=>{
  var sql = `DELETE FROM posts WHERE posts_id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

//UPDATE
router.put('/:id', (req, res, next)=>{
    const {title, body, date, author} = req.body;
  
    let sql = "UPDATE posts SET ";
  
    if (title) {sql += `post_title='${ title }',`} ;
    if (body) {sql += `post_body='${ body }',`} ;
    if (date) {sql += `post_date='${ date }',`} ;
    if (author) {sql += `post_author='${ author }',`} ;
    if (sql.endsWith(',')) sql = sql.substring(0, sql.length-1), 
  
    sql += `WHERE post_id='${req.params.id}'` 
  
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
  })

module.exports = router;