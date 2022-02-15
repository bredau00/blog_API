const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "lifechoices",
  password: "@Lifechoices1234",
  database: "personal_blog",
});

// posting comment
router.post('/', (req, res) => {
    const {author, text, post} = req.body;
    if (!author || !author || !post)
    res.status(400).send({ msg: "Not all fields have been submitted" })
    var sql = `INSERT INTO comments (comment_author, comment_text, comment_post) VALUES ('${author}', '${text}', '${post}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
})

// GET ALL comments
router.get('/', (req, res, next)=>{
  var sql = `SELECT * FROM comments`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

// GET ONE comment
router.get('/:id', (req, res, next)=>{
  var sql = `SELECT * FROM comments WHERE comment_id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

// DELETE ONE
router.delete('/:id', (req, res, next)=>{
  var sql = `DELETE FROM comments WHERE comment_id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
})

//UPDATE
router.put('/:id', (req, res, next)=>{
    const {author, text, post} = req.body;
  
    let sql = "UPDATE comments SET ";
  
    if (author) {sql += `comment_author='${ author }',`} ;
    if (text) {sql += `comment_text='${ text }',`} ;
    if (post) {sql += `comment_post='${ post }',`} ;
    if (sql.endsWith(',')) sql = sql.substring(0, sql.length-1), 
  
    sql += `WHERE comment_id='${req.params.id}'` 
  
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      res.send(result)
    });
  })

module.exports = router;