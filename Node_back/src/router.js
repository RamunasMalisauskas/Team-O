const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = require("./database");
const midware = require("./midware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// ### DEMO LINK ###
router.get("/", (req, res) => {
  res.status(200).json("The API service works!");
});

//  ### LOGIN LINKS ####
router.get("/register", (req, res) => {
  con.query(`SELECT * FROM users`, (err, result) => {
    if (err) return res.status(400).json({ msg: err });
    res.status(200).json(result);
  });
});

router.post("/register", midware.validateUserData, (req, res) => {
  // const are precoded not to cloister rest of the code
  const email = req.body.email;
  const user = req.body;

  // checking the avalability of unique user to register
  con.query(
    `SELECT * FROM users WHERE email = ${mysql.escape(email)}`,
    (err, result) => {
      if (err) return res.status(400).json({ msg: err });
      else if (result != 0) {
        res.status(400).json({ msg: "user already created under this email" });
        // encrypting the users password and created hash will be stored into DB (not original password)
      } else {
        bcrypt.hash(user.password, 10, (err, hash) => {
          if (err) return res.status(400).json({ msg: err });
          con.query(
            // inserting values with mysql.escape function so that it can't be hack by input
            `INSERT INTO users (email, password) VALUES (${mysql.escape(
              email
            )}, ${mysql.escape(hash)})`,
            (err, result) => {
              if (err) return res.status(400).json({ msg: err });
              res.status(201).json({
                msg: `${email} successfully registered`,
              });
            }
          );
        });
      }
    }
  );
});

router.post("/login", midware.validateUserData, (req, res) => {
  const email = req.body.email;
  const loginPass = req.body.password;

  // validating input length
  if (email.length === 0) {
    res.status(400).json({ msg: "please type in username" });
  } else if (loginPass.length === 0) {
    res.status(400).json({ msg: "please type in password" });
  } else {
    con.query(
      // validating by selecting data from specific DB collum
      `SELECT * FROM users WHERE email = ${mysql.escape(email)}`,
      (err, result) => {
        if (err) return res.status(400).json({ msg: err });
        // and  checking if the user exist in DB
        else if (result.length === 0) {
          res.status(400).json({ msg: "user not found in database" });
        } else {
          // if user exist getting his password
          const storedPass = result[0].password;
          // using bcrypt.compare function to decode and match passwords from input and DB
          bcrypt.compare(loginPass, storedPass, (compareErr, compareResult) => {
            if (compareErr || !compareResult)
              res.status(400).json({ msg: "email or password doesn't match" });
            else {
              // if the passwords match user token is created with jwt and secret key stored in environmental variables
              const token = jwt.sign(
                { userID: result[0].id, email: email },
                process.env.SECRET_KEY,
                // adding expirasion date of 72 hours
                {
                  expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 72,
                }
              );
              // and sending created token back
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



module.exports = router;
