const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

const ethereumUri = 'http://localhost:8540';
const address = '0x00469E09F58A0b20c4c9C1bEa0A46d4FCF124a66';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{
    console.log('connected to ehterum node at ' + ethereumUri);
    let coinbase = web3.eth.coinbase;
    console.log('coinbase:' + coinbase);
    let balance = web3.eth.getBalance(coinbase);
    console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
    let accounts = web3.eth.accounts;
    console.log(accounts);

    if (web3.personal.unlockAccount(address, 'user')) {
        console.log(`${address} is unlocaked`);
    }else{
        console.log(`unlock failed, ${address}`);
    }
}

/*
* Compile Contract and Fetch ABI
*/
let source = fs.readFileSync("./contracts/BasicToken.sol", 'utf-8');

console.log('compiling contract...');
let compiledContract = solc.compile(source);
console.log('done');

for (let contractName in compiledContract.contracts) {
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}

console.log(JSON.stringify(abi, undefined, 2));

/*
* deploy contract
*/
let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});
console.log('gasEstimate = ' + gasEstimate);
let MyContract = web3.eth.contract(abi);
console.log('deploying contract...');
let myContractReturned = MyContract.new( {
    from: address,
    data: '0x'+ bytecode,
    gas: gasEstimate + 50000
}, function (err, myContract) {
    if (!err) {
        if (!myContract.address) {
            console.log(`myContract.transactionHash = ${myContract.transactionHash}`);
        } else {
            console.log(`myContract.address = ${myContract.address}`);
            global.contractAddress = myContract.address;
        }
    } else {
        console.log(err);
    }
});


(function wait () {
    setTimeout(wait, 1000);
})();
