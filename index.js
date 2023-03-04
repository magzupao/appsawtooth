const { TransactionProcessor } = require('sawtooth-sdk-js/processor')
const IntegerKeyHandler = require('./handler/inckey')

const VALIDATOR_URL = 'tcp://localhost:4004'
const transactionProcessor = new TransactionProcessor(VALIDATOR_URL)

transactionProcessor.addHandler(new IntegerKeyHandler());

transactionProcessor.start();

process.on('SIGUSR2', () => {
  transactionProcessor._handleShutdown();
})

console.log('hola!!!!!!!')
