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

//  ### LOGIN LINKS ###

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
              // inside token storing userID/ email/ admin rights/ experation date
              const token = jwt.sign(
                { userID: result[0].id, email: email, admin: req.admin },
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

// ### PLAYER DB LINKS ####

// fetching player list
router.get(`/players`, midware.LoggedIn, (req, res) => {
  //  renamed user data fetched from middleware
  const vertifyUser = req.userData;

  //  vertifing userID from middleware
  if (vertifyUser.userID !== 0) {
    con.query(`SELECT * FROM player`, (err, result) => {
      if (err) {
        return res.status(400).json({ msg: err });
        // what happens when there is no players in database
      } else if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "there is no players added to database" });
      } else {
        res.status(200).json(result);
      }
    });
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

// adding new players
router.post("/players", midware.LoggedIn, (req, res) => {
  // organizing request data
  const player = req.body.name;
  const vertifyUser = req.userData;

  // vertifing if the user has admin rights
  if (vertifyUser.admin) {
    // vertification of request input
    if (!player) {
      return res.status(400).json({ msg: "no player name has been entered" });
      // validating length of input
    } else if (player.length > 22)
      return res.status(400).json({ msg: "player name is too long" });
    else {
      con.query(
        // validating if the entered name is unique or already exist in database
        // Selecting matching name from DB ->
        `SELECT name FROM player WHERE name = '${player}'`,
        (err, result) => {
          if (err) return res.status(400).json({ msg: err });
          // -> and if there is results deliver the message ->
          else if (result.length !== 0) {
            return res
              .status(200)
              .json({ msg: `${player} is already included in database` });
          } else {
            // -> if there is no match added to DB
            con.query(
              `INSERT INTO player (name) VALUES (${mysql.escape(player)})`,
              (err, result) => {
                if (err) return res.status(400).json({ msg: err });
                res.status(200).json({ msg: `${player} added successfully` });
              }
            );
          }
        }
      );
    }
  } else {
    return res.status(400).json({ msg: "only admin can enter players" });
  }
});

// deleting player from DB
router.delete("/players", midware.LoggedIn, (req, res) => {
  // organizing request data
  const id = req.body.id;
  const vertifyUser = req.userData;
  // vertifing if the user has admin rights
  if (vertifyUser.admin) {
    // vertification of request input
    if (id) {
      con.query(
        `DELETE FROM player WHERE id = (${mysql.escape(id)})`,
        (err, result) => {
          if (err) return res.status(400).json({ msg: err });
          res.status(200).json({ msg: `player deleted successfully` });
        }
      );
    } else {
      return res.status(400).json({ msg: "no player selected" });
    }
  } else {
    return res.status(400).json({ msg: "only admin can delete players" });
  }
});

// ### TEAM DB LINKS ###

// getting all one user teams
router.get("/teams", midware.LoggedIn, (req, res) => {
  // organizing request data
  const team = req.body;
  const vertifyUser = req.userData;

  // vertification of valid user
  if (vertifyUser.userID !== 0) {
    con.query(
      // selecting  data by matching user id (so it's avalibe only to this user) ->
      `SELECT team_name FROM team WHERE user = ${mysql.escape(
        vertifyUser.userID
        // -> and returning grouped (unique) team names of every user
      )} GROUP by team_name`,
      (err, result) => {
        if (err) {
          return res.status(400).json({ msg: err });
          // what happens when there is no players in database
        } else if (result.length === 0) {
          return res.status(200).json({ msg: "you have no teams" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

// getting team players from selected team
router.post("/team_players", midware.LoggedIn, (req, res) => {
  // organizing request data
  const team = req.body;
  const vertifyUser = req.userData;

  // vertification of valid user
  if (vertifyUser.userID !== 0) {
    if (team.name) {
      con.query(
        // selecting player name and id by matching team name and double checking the user id (so it's avalibe only to this user)
        // after creating he team, the first player is allways null, it's needed to be exepted from selection
        `SELECT id, players FROM team WHERE team_name = ${mysql.escape(
          team.name
        )} AND user = ${mysql.escape(
          vertifyUser.userID
        )} AND players IS NOT NULL`,
        (err, result) => {
          if (err) return res.status(400).json({ msg: err });
          if (result.length === 0) {
            return res
              .status(200)
              .json({ msg: `there is no players on ${team.name} team` });
          }
          res.status(200).json(result);
        }
      );
    } else {
      return res.status(200).json({ msg: "no team is selected" });
    }
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

// adding new team to BD
router.post("/add_team", midware.LoggedIn, (req, res) => {
  // organizing request data
  const team = req.body.name;
  const vertifyUser = req.userData;

  // vertification of valid user
  if (vertifyUser.userID !== 0) {
    // validating request input
    if (!team) {
      return res.status(400).json({ msg: "no team name has been entered" });
      // validating input length
    } else if (team.length > 10) {
      return res.status(400).json({ msg: "team name is too long" });
    } else {
      con.query(
        // validating if the entered name is unique or already exist in database
        // Selecting matching name from DB ->
        `SELECT team_name FROM team WHERE team_name = '${team}'`,
        (err, result) => {
          if (err) return res.status(400).json({ msg: err });
          // -> and if there is matching results: deliver the message ->
          else if (result.length !== 0) {
            return res
              .status(200)
              .json({ msg: `${team} name is already in use` });
          } else {
            // -> if there is no match: add data to DB
            con.query(
              `INSERT INTO team (user, team_name) VALUES ( ${mysql.escape(
                vertifyUser.userID
              )} ,${mysql.escape(team)})`,
              (err, result) => {
                if (err) return res.status(400).json({ msg: err });
                res
                  .status(200)
                  .json({ msg: `${team} team created successfully` });
              }
            );
          }
        }
      );
    }
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

// inserting player in selected team
router.post("/add_players_to_team", midware.LoggedIn, (req, res) => {
  // organizing request data
  const team = req.body;
  const vertifyUser = req.userData;

  // double vertification of request input
  if (team.name && team.player_name) {
    con.query(
      // validating if the player already is on team ->
      `SELECT * FROM team WHERE players = ${mysql.escape(
        team.player_name
      )} AND user = ${mysql.escape(vertifyUser.userID)}`,
      (err, result) => {
        if (err) return res.status(400).json({ msg: err });
        // -> if he is on a team: sending message
        else if (result.length !== 0) {
          return res.status(200).json({
            msg: `${team.player_name} is already on this ${team.name}`,
          });
        } else {
          con.query(
            // inserting into team: user id (fetch from midware) and team name/ player name
            `INSERT INTO team (user, team_name, players) VALUES (${mysql.escape(
              vertifyUser.userID
            )}, ${mysql.escape(team.name)}, ${mysql.escape(team.player_name)})`,
            (err, result) => {
              if (err) return res.status(400).json({ msg: err });
              res.status(200).json({
                msg: `${team.player_name} posted successfully to ${team.name}`,
              });
            }
          );
        }
      }
    );
  } else {
    return res
      .status(400)
      .json({ msg: "no team name or player has been selected" });
  }
});

// inserting player in selected team
router.post("/trade_player", midware.LoggedIn, (req, res) => {
  // organizing request data
  const team = req.body;
  const vertifyUser = req.userData;

  // vertification of valid user
  if (vertifyUser.userID !== 0) {
    // vertification of request inputs
    if (team.name && team.player_name && team.old_team) {
      // matching team DB players by selecting old team and players and matchin with given player ->
      con.query(
        `SELECT players FROM team WHERE team_name = ${mysql.escape(
          team.name
        )} AND players = ${mysql.escape(team.player_name)}`,
        (err, result) => {
          if (err) return res.status(400).json({ msg: err });
          //  -> if there is no results (both AND's didn't passed) following with trade ->
          else if (result == 0) {
            con.query(
              // updating team name in table team with new_team name
              `UPDATE team SET team_name = ${mysql.escape(
                team.name
              )}  WHERE players = ${mysql.escape(team.player_name)}`,
              (err, result) => {
                if (err) return res.status(400).json({ msg: err });
                res.status(200).json({
                  msg: `${team.player_name} traded successfully to ${team.name}`,
                });
              }
            );
            // -> if there was match of players - sending msg
          } else {
            return res.status(400).json({
              msg: ` ${team.player_name} is already on ${team.name}`,
            });
          }
        }
      );
    } else {
      return res
        .status(400)
        .json({ msg: "no team or player has been selected" });
    }
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

// deleting all players from selected team
router.delete("/team_players", midware.LoggedIn, (req, res) => {
  // organizing request data
  const team = req.body;
  const vertifyUser = req.userData;

  // vertification of valid user
  if (vertifyUser.userID !== 0) {
    con.query(
      // deleting team by team name and user id
      `DELETE FROM team WHERE team_name = ${mysql.escape(
        team.name
      )} AND user = ${mysql.escape(vertifyUser.userID)}`,
      (err, result) => {
        if (err) return res.status(400).json({ msg: err });
        res.status(200).json({ msg: `${team.name} players removed from team` });
      }
    );
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

// deleting selected team
router.delete("/remove_team", midware.LoggedIn, (req, res) => {
  // organizing request data
  const team = req.body.name;
  const vertifyUser = req.userData;

  // vertification of valid user
  if (vertifyUser.userID !== 0) {
    if (team) {
      con.query(
        // deleting player from team by validating user id/ fetching team name and player name
        `DELETE FROM team WHERE team_name = ${mysql.escape(
          team
        )} AND user = ${mysql.escape(vertifyUser.userID)}`,
        (err, result) => {
          if (err) return res.status(400).json({ msg: err });
          // in case there is no player selected: sending back msg
          res.status(200).json({
            msg: `${team} removed`,
          });
        }
      );
    } else {
      return res.status(200).json({ msg: "no team is selected" });
    }
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

// deleting selected player from selected team
router.delete("/remove_team_player", midware.LoggedIn, (req, res) => {
  // organizing request data
  const selected = req.body;
  const vertifyUser = req.userData;

  // vertification of valid user
  if (vertifyUser.userID !== 0) {
    if (selected.player_name) {
      con.query(
        // deleting player from team by validating user id/ fetching team name and player name
        `DELETE FROM team WHERE team_name = ${mysql.escape(
          selected.team_name
        )} AND user = ${mysql.escape(
          vertifyUser.userID
        )} AND players = ${mysql.escape(selected.player_name)} `,
        (err, result) => {
          if (err) return res.status(400).json({ msg: err });
          // in case there is no player selected: sending back msg
          res.status(200).json({
            msg: `${selected.player_name} removed from ${selected.team_name}`,
          });
        }
      );
    } else {
      return res.status(200).json({ msg: "no player selected" });
    }
  } else {
    return res.status(400).json({ msg: "userData ID is not defined" });
  }
});

module.exports = router;
