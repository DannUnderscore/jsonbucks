let libjsonbucks = require("./libjsonbucks");

let guy = new libjsonbucks.Bookkeeper({
    secretKey: "4f92da4954e5dee44e1141267f47a81302c4371f6cb1049eda57da7d6e52f54b"
});

console.log(guy.getSecretKey());
console.log(guy.createTransaction("henk", "5.211111"));