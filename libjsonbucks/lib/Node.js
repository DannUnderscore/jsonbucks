let elliptic = require("elliptic").ec;
let sha512 = require("./utils").sha512;

class Node {
    constructor(options) {
        this.peers = {};

        this.keyPairCreator = new elliptic("secp256k1");

        if (options.secretKey)
            this.keyPair = this.keyPairCreator.keyFromPrivate(options.secretKey);
        else if (options.publicKey)
            this.keyPair = this.keyPairCreator.keyFromPublic(options.publicKey, "hex")
        else
            this.keyPair = this.keyPairCreator.genKeyPair();
    }

    sign(data) {
        return this.keyPair.sign(sha512(data)).toDER("hex");
    }

    verify(data, signature) {
        return this.keyPair.verify(sha512(data), signature)
    }

    getPublicKey() {
        return this.keyPair.getPublic().encode("hex");
    }

    getSecretKey() {
        return this.keyPair.getPrivate("hex")
    }

    createTransaction(to, amount) {
        let transaction = {
            from: this.getPublicKey(),
            to: to,
            amount: amount,
            timestamp: new Date().getTime(),

            signature: null,
            hash: null
        }

        transaction.signature = this.signTransaction(transaction);
        transaction.hash = this.hashTransaction(transaction);

        return transaction;
    }

    signTransaction(transaction) {
        let signable = {
            from: transaction.from,
            to: transaction.to,
            amount: transaction.amount,
            timestamp: transaction.timestamp
        }

        return this.sign(JSON.stringify(signable));
    }

    hashTransaction(transaction) {
        let hashable = {
            from: transaction.from,
            to: transaction.to,
            amount: transaction.amount,
            timestamp: transaction.timestamp,
            signature: transaction.signature
        }

        return sha512(JSON.stringify(hashable));
    }
}

module.exports = Node;