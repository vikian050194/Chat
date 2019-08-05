var express = require("express"),
    router = express.Router(),
    path = require("path");

if (process.env.NODE_ENV === "production") {
    router.route("/")
        .get(function (req, res) {
            res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
        });
}

router.route("*")
    .all(function (req, res) {
        res.sendStatus(404);
    });

module.exports = router;