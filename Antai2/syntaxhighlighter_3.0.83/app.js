
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/')));

var env = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV !== 'production')
    require('./server/outRouter').call(app);

var server = app.listen(4007, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("http://%s:%s", host, port ,',启动成功')

})
