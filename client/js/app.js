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

    run() {
        const chat = document.querySelector("#chat");
        const users = document.querySelector("#users");
        const form = document.querySelector("form");
        const input = document.querySelector("input");
        input.focus();
        
        const sendNewMessage = (message) => {
            this.socket.emit("message:send", message);
        };

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            sendNewMessage(input.value);

            input.value = "";
        });

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