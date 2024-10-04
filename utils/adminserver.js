const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(function(req,res,next){
    req.church = req.query.church || req.headers['accept-church'];
    next();
  });
app.use(express.static('../onehtw-admin/'));
app.listen(3535);
