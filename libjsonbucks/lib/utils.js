let crypto = require("crypto");

function sha512(data) {
    return crypto.createHash("sha512").update(data).digest("hex");
}

module.exports = {
    sha512: sha512
}