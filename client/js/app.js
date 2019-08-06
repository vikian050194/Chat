import io from "socket.io-client";

export default class App {
    constructor() {
        console.info(`App is started at ${(new Date()).toLocaleString()}`);

        this.user = undefined;
        this.socket = io();

        window.addEventListener("beforeunload", () => {
            this.socket.emit("user:logout", this.user);
        });
    }

    login() {
        while (this.user === undefined || this.user === null || this.user.length === 0) {
            this.user = prompt("What is your name?");
        }

        this.socket.emit("user:login", this.user);
    }

    sendNewMessage(message) {
        this.socket.emit("message:send", { user: this.user, message });
    }

    run() {
        const chat = document.getElementById("chat");
        const users = document.getElementById("users");

        const addMessage = (data) => {
            let className = "";

            if (data.isInfo) {
                className = "info";
            } else {
                className = data.isMe ? "user-current" : "";
            }

            let newDiv = document.createElement("p");
            newDiv.className = className;
            let newContent = document.createTextNode(`${data.userName}: ${data.message}`);
            newDiv.appendChild(newContent);
            chat.appendChild(newDiv);
        };

        const addUser = (data) => {
            let newDiv = document.createElement("p");
            newDiv.id = data.userName;
            newDiv.className = data.isMe ? "user-current" : "user-other";
            let newContent = document.createTextNode(data.userName);
            newDiv.appendChild(newContent);
            users.appendChild(newDiv);
        };

        const deleteUser = (data) => {
            document.getElementById(data.userName).remove();
        };

        this.login();

        this.socket.on("user:login", addUser);
        this.socket.on("user:logout", deleteUser);
        this.socket.on("message:new", addMessage);
    }
}