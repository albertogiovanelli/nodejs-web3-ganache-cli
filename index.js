const Web3 = require('web3');

const web3Provider = new Web3('http://localhost:8545');

async function getAddresses() {
    return web3Provider.eth.getAccounts().then((addresses) => {
        return addresses;
    });
}

async function getBalance(address) {
    return web3Provider.eth.getBalance(address).then((balance) => {
        return web3Provider.utils.fromWei(balance, 'ether');
    })
}

async function getAccounts() {
    let addresses = await getAddresses();
    let accounts = [];
    for (let address of addresses) {
        let account = {};
        let balance = await getBalance(address);
        account.address = address;
        account.balance = balance;
        accounts.push(account);
    }
    return accounts;
}

getAccounts().then((accounts) => {
    console.log("Accounts on testrpc : ", accounts)
}).catch((err) => {
    console.log("Error Occured : ", err)
});