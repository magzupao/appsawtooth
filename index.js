const { TransactionProcessor } = require('sawtooth-sdk-js/processor')

const VALIDATOR_URL = 'tcp://localhost:4004'
const transactionProcessor = new TransactionProcessor(VALIDATOR_URL)

transactionProcessor.start();
console.log('hola magz 1 !!!!!!!')
