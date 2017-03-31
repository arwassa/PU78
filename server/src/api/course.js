const express = require("express");
const courseRouter = express.Router({mergeParams:true});
const database = require("../database.js");

const clientService = require("../services/database/client.service.js").clientService;


courseRouter.get('/course', (req,res) => {
  let search = req.query.q;
  clientService.getClient(database).subscribe(conn => {
    conn.query(
      `SELECT * FROM Courses WHERE idCourse LIKE '%${search}%' LIMIT 10;`,
      (_,rows) => {
        if (!_) {
          res.json(rows);
        } else {
          console.log(_);
          res.json([1234]);
        };
      }
    );
  });
});

module.exports = courseRouter;