const port = process.env.PORT || 8080;

const express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io")(server),
    Repository = require("./repository"),
    repository = new Repository();

const systemUser = "SYSTEM";

io.on("connection", function (client) {
    repository.getUsers().forEach(element => {
        client.emit("user:login", {
            userName: element,
            isMe: false
        });
    });

    repository.getMessages().forEach(element => {
        client.emit("message:new", {
            userName: element.userName,
            message: element.message,
            isMe: client.userName === element.userName,
            isInfo: element.isInfo
        });
    });

    client.on("user:login", function (userName) {
        client.userName = userName;
        console.info(`"${userName}" is logged in`);

        client.emit("user:login", {
            userName: userName,
            isMe: true
        });

        client.broadcast.emit("user:login", {
            userName: userName,
            isMe: false
        });

        repository.addUser(userName);
        repository.addMessage({
            userName: systemUser,
            message: `${userName} is logged in`,
            isInfo: true
        });
        client.emit("message:new", {
            userName: systemUser,
            message: `${userName} is logged in`,
            isMe: false,
            isInfo: true
        });
        client.broadcast.emit("message:new",{
            userName: systemUser,
            message: `${userName} is logged in`,
            isMe: false,
            isInfo: true
        });
    });

    client.on("user:logout", function () {
        if (client.userName === undefined) {
            return;
        }

        console.info(`"${client.userName}" is logged out`);

        client.broadcast.emit("user:logout", {
            userName: client.userName
        });

        repository.removeUser(client.userName);
        repository.addMessage({
            userName: systemUser,
            message: `${client.userName} is logged out`,
            isInfo: true
        });
        client.emit("message:new", {
            userName: systemUser,
            message: `${client.userName} is logged out`,
            isMe: false,
            isInfo: true
        });
        client.broadcast.emit("message:new",{
            userName: systemUser,
            message: `${client.userName} is logged out`,
            isMe: false,
            isInfo: true
        });
    });

    client.on("message:send", function (message) {
        var data = {
            userName: client.userName,
            message
        };

        client.emit("message:new", Object.assign({}, data, {
            isMe: true
        }));

        client.broadcast.emit("message:new", Object.assign({}, data, {
            isMe: false
        }));

        repository.addMessage(data);
    });

    console.info("New user is connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

var router = require("./router");
app.use("/", router);

server.listen(port, function () {
    console.info("Listening on port " + port);
});