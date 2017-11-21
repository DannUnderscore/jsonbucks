#!/usr/bin/env node

let commander = require("commander");
let express = require("express");
let libjsonbucks = require("../libjsonbucks/lib/main");

commander
    .version("0.0.1")
    .arguments("<secretKey>")
    .option("-k, --key <key>", "Will use the predefined secret key")
    .option("-p, --port <port>", "Port for the HTTP traffic to go on")
    .option("-g, --generate", "Will generate a new private key for the bookkeeper")
    .action(function (secretKey) {
        if (commander.generate) {
            secretKey = undefined;
            console.log("Using new secret key...");
        }
        else if(!secretKey){
            commander.help();
            process.exit(-1);
        }

        let bookkeeper = new libjsonbucks.Bookkeeper({
            secretKey: secretKey,
            port: commander.port
        });

        bookkeeper.listen(function () {
            console.log("Bookkeeper is running on port " + bookkeeper.port);
            console.log("Using secret key: " + bookkeeper.getSecretKey());
        })
    })
    .parse(process.argv);