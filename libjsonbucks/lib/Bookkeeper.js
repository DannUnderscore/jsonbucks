let Node = require("./Node");
let express = require("express");

class Bookkeeper extends Node {
    constructor(options) {
        super(options);

        this.port = options.port || 7247;
        this.app = express();

        let bookkeeper = this;

        this.app.get("/publicKey", function (req, res) {
            res.send({
                publicKey: bookkeeper.getPublicKey()
            });
        })
    }

    listen(cb) {
        this.app.listen(this.port, function () {
            cb();
        })
    }
}

module.exports = Bookkeeper;