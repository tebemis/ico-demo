// Get test account 1
account1 = web3.eth.accounts[1]

// Get NVCoinCrowdsale instance (crowdsale.address gives you the address)
NVCoinCrowdsale.deployed().then(inst => { crowdsale = inst })

// Get token address for NVCrowdsale (i.e. address for NVCoin)
crowdsale.token().then(addr => { tokenAddress = addr } )
nvCoinInstance = NVCoin.at(tokenAddress)

// Check account balance
nvCoinInstance.balanceOf(account1).then(balance => balance.toString(10))

// Account balance in ether
web3.fromWei(web3.eth.getBalance(account1).toString(), "ether")

// Buy coin
crowdsale.sendTransaction({ from: account1, value: web3.toWei(5, "ether")})

// Check balance in NVCoin
nvCoinInstance.balanceOf(account1).then(balance => account1NVTokenBalance = balance.toString(10))
web3.fromWei(account1NVTokenBalance, "ether")