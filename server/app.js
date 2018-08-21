const port = process.env.PORT || 8080;

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io")(server),
    Repository = require("./repository"),
    repository = new Repository();

io.on("connection", function (client) {
    repository.getUsers().forEach(element => {
        client.emit("user:login", {
            userName: element,
            isMe: false
        });
    });
    
    client.on("user:login", function (userName) {
        client.userName = userName;
        console.log(`"${userName}" is logged in`);

        client.emit("user:login", {
            userName: userName,
            isMe: true
        });

        client.broadcast.emit("user:login", {
            userName: userName,
            isMe: false
        });

        repository.addUser(userName);
    });

    client.on("user:logout", function () {
        if (client.userName === undefined) {
            return;
        }

        console.log(`"${client.userName}" is logged out`);

        client.broadcast.emit("user:logout", {
            userName: client.userName
        });

        repository.removeUser(client.userName);
    });

    console.log("New user is connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));

var router = require('./router');
app.use('/', router);

server.listen(port, function () {
    console.log('Listening on port ' + port);
});