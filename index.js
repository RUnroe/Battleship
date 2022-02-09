const express = require('express');
const path = require('path');
// const cors = require("cors");
const io = require('socket.io')(http);
const session = require("express-session");

const app = express();

const db = require('./db/dal');
const { server, io } = require('./sockets')({db, app});


// var corsOptions = {
//     origin:  ['http://localhost:3000', 'http://localhost:3001', 'http://192.168.1.101:3000'],
//     credentials: true,
//     optionsSuccessStatus: 200,
//     allowedHeaders: "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Set-Cookie",
//     exposedHeaders: "Set-Cookie"
//   }
//   app.use(cors(corsOptions));

app.set("trust proxy", 1);
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));



let routeFiles = ['api/orders', 'api/users', 'api/products', 'api/icons'];
const routeManager = require('./routes/manager');
routeFiles.forEach((file) => {
        let component = require(`./routes/${file}`);
        if (component.configure) component.configure({
                dal, io
        });
        routeManager.apply(app, component);
});


server.listen(3001, () => {
  console.log('listening on *:3001');
});