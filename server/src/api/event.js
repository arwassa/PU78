const express = require("express");
const eventRouter = express.Router({mergeParams:true});
const database = require("../database.js");
const clientService = require("../services/database/client.service.js").clientService;
const utils = require("../common/utils.js");
const userError = utils.userError;
const internalError = utils.internalError;


eventRouter.get('/events', (req, res) => {
  if(req.user){
    let tokenID = req.user.data.sub;
    clientService.getClient(database).subscribe((conn) => {
      conn.query(`SELECT * FROM Events WHERE idUsersFeide_fkEvents ='${tokenID}';`, (_,rows) =>{
        if(_){
          console.log(_);
          res.json([1234]);
        }else{
          res.json(rows);
        }
      });
    });
  }else{
    userError(res)
  }
});

eventRouter.delete('/events', (req,res) => {
  if(req.user){
    clientService.getClient(database).subscribe((conn) => {
      conn.query(
        `DELETE FROM Events WHERE idEvents = ${req.body.id};`, () => {
          res.json({status:"ok"});
        }
      );
    });
  }else{
    userError(res);
  }
});

eventRouter.post('/events', (req, res) => {
  if(req.user){
    let tokenID = req.user.data.sub;
    let title = req.body.title;
    let description = req.body.desc;
    let type = "personal";
    let start = req.body.startDate.slice(0,19).replace("T"," ");
    let end = req.body.endDate.slice(0,19).replace("T"," ");
    clientService.getClient(database).subscribe((conn) => {
      conn.query(`
        INSERT INTO Events(eventTitle, eventDesc, eventType, eventStart, eventEnd, idUsersFeide_fkEvents) VALUES('${title}', '${description}', '${type}', '${start}', '${end}', '${tokenID}');`,
        (_, result) => {
          res.json({status:"ok", id:result.insertId})
        });
    });
  }else{
    userError(res);
  }
});

eventRouter.patch('/events', (req, res) => {
  if(req.user){
    let tokenID = req.user.data.sub;
    let eventID = req.body.id;
    let title = req.body.title;
    let description = req.body.desc;
    let type = "personal";
    let start = req.body.startDate.slice(0,19).replace("T"," ");
    let end = req.body.endDate.slice(0,19).replace("T"," ");
    clientService.getClient(database).subscribe((conn) => {
      conn.query(`UPDATE Events SET eventTitle='${title}', eventDesc='${description}', eventType='${type}', eventStart='${start}', eventEnd='${end}', idUsersFeide_fkEvents='${tokenID}' WHERE idEvents='${eventID}';`,(_) => {
        if(!_)
          res.json({status:"ok"});  
        else
          internalError(res);
      });
    });
  }else{
    userError(res);
  }
});



module.exports = eventRouter;
