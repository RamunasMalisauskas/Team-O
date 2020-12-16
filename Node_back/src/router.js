const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = require("./database");
const midware = require("./midware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) => {
  res.status(200).json("The API service works!");
});

router.get("/register", (req, res) => {
  con.query(`SELECT * FROM users`, (err, result) => {
    if (err) return res.status(400).json({ msg: err });
    res.status(200).json(result);
  });
});

router.post("/register", midware.validateUserData, (req, res) => {
  const username = req.body.username.toLowerCase();
  const user = req.body;
  con.query(
    `SELECT * FROM users WHERE username = ${mysql.escape(username)}`,
    (err, result) => {
      if (err) return res.status(400).json({ msg: err });
      else if (result != 0) {
        res.status(400).json({ msg: "user already exist" });
      } else {
        bcrypt.hash(user.password, 10, (err, hash) => {
          if (err) return res.status(400).json({ msg: err });
          con.query(
            `INSERT INTO users (username, password) VALUES (${mysql.escape(
              username
            )}, ${mysql.escape(hash)})`,
            (err, result) => {
              if (err) return res.status(400).json({ msg: err });
              res.status(201).json({
                msg: `${username} successfully registered`,
              });
            }
          );
        });
      }
    }
  );
});

router.post("/login", midware.validateUserData, (req, res) => {
  const username = req.body.username.toLowerCase();
  const loginPass = req.body.password;

  if (username.length === 0) {
    res.status(400).json({ msg: "please type in username" });
  } else if (loginPass.length === 0) {
    res.status(400).json({ msg: "please type in password" });
  } else {
    con.query(
      `SELECT * FROM users WHERE username = ${mysql.escape(username)}`,
      (err, result) => {
        if (err) return res.status(400).json({ msg: err });
        else if (result.length === 0) {
          res.status(400).json({ msg: "user not found in database" });
        } else {
          const storedPass = result[0].password;

          bcrypt.compare(loginPass, storedPass, (compareErr, compareResult) => {
            if (compareErr || !compareResult)
              res
                .status(400)
                .json({ msg: "username or password doesn't match" });
            else {
              const token = jwt.sign(
                { userID: result[0].id, user: username },
                process.env.SECRET_KEY,
                {
                  expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 72,
                }
              );
              res.status(202).json({
                msg: "logged in ",
                token,
              });
            }
          });
        }
      }
    );
  }
});

router.get(`/books`, midware.LoggedIn, (req, res) => {
  const verifyUser = req.userData;

  if (verifyUser.userID !== 0) {
    con.query(
      `SELECT id, author, title FROM books WHERE user_id = ${mysql.escape(
        verifyUser.userID
      )}`,
      (err, result) => {
        if (err) return res.status(400).json({ msg: err });
        else if (result.length === 0) {
          return res
            .status(400)
            .json({ msg: "there is no records coresponding to this user" });
        }
        res.status(200).json(result);
      }
    );
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

router.post("/books", midware.LoggedIn, (req, res) => {
  const book = req.body;
  const verifyUser = req.userData;

  if (book.author && book.title) {
    con.query(
      `INSERT INTO books (user_id, author, title) VALUES ( ${mysql.escape(
        verifyUser.userID
      )}, ${mysql.escape(book.author)}, ${mysql.escape(book.title)})`,
      (err, result) => {
        if (err) return res.status(400).json({ msg: err });
        res.status(200).json({ msg: "posted successfully" });
      }
    );
  }
});

module.exports = router;
