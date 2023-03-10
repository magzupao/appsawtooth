const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')

const { Secp256k1PrivateKey } = require('sawtooth-sdk-js/signing/secp256k1');
const { CryptoFactory, createContext } = require('sawtooth-sdk-js/signing');
const protobuf = require('sawtooth-sdk-js/protobuf');

const createPrivateKey = () => {
    const msg = randomBytes(32)
    let privKey
    do {
        privKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey))
    const pubKey = secp256k1.publicKeyCreate(privKey)
    const sigObj = secp256k1.ecdsaSign(msg, privKey)
    console.log(secp256k1.ecdsaVerify(sigObj.signature, msg, pubKey))
    return privKey.toString('hex')
}

const privateKeyHexStr = createPrivateKey();

const privateKey = new Secp256k1PrivateKey(privateKeyHexStr);

const context = createContext('secp256k1');

const signer = new CryptoFactory(context).newSigner(privateKey);

const payload = "Test ME!!!!!!!";
const payloadBytes = Buffer.from(payload);

const transactionHanderBytes = protobuf.TransactionHeader.encode({
    familyName: 'intkey',
    familyVersion: '1.0',
    inputs: [],
    outputs: [],
    signerPublicKey: signer.getPublicKey().asHex(),
    nonce: `${Math.random()}`,
    batchrPublickey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
})

const transaction = protobuf.Transaction.create({
    header: transactionHanderBytes,
    headerSignature: signer.sign(transactionHanderBytes),
    payload: payloadBytes
})

const transactions = [transaction];

const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map(t => t.headerSignature)    
}).finish();

const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: signer.sign(batchHeaderBytes),
    transactions: transactions
})

const batches = [batch];
const batchLisBytes = protobuf.BatchList.encode({
    batches: batches
}).finish();

console.log(batchLisBytes.toString())

