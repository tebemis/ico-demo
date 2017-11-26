import React, { Component } from 'react'
// import Grid from 'material-ui/Grid';
// Components
import Accounts from './components/Accounts';
import MasterAccount from './components/MasterAccount';
// import LogWindow from './components/LogWindow';
// web3 lib
import getWeb3 from './utils/getWeb3'
// Contracts
import NVCoin from '../build/contracts/NVCoin.json'
import NVCoinCrowdsale from '../build/contracts/NVCoinCrowdsale.json'


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      nvcPrice: 5
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance
    // Setup contracts once web3 is available

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      this.setupContracts()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  setupContracts() {
    const contract = require('truffle-contract')
    const nvCoin = contract(NVCoin)
    nvCoin.setProvider(this.state.web3.currentProvider)
    const nvCrowdsale = contract(NVCoinCrowdsale)
    nvCrowdsale.setProvider(this.state.web3.currentProvider)

    nvCrowdsale.deployed().then(instance => { 
      this.setState({ nvCoinCrowdsaleInstance: instance});
      this.state.nvCoinCrowdsaleInstance.token().then(tokenAddress => { 
        this.setState({ nvCoinInstance: nvCoin.at(tokenAddress)});
        this.fetchAccounts();
      });
    });
  }

  fetchAccounts() {
    // Get accounts and their balance
    this.state.web3.eth.getAccounts((error, accounts) => {
      // Fetch NVC balance for all accounts
      Promise.all(
        accounts.map(account => 
          this.state.nvCoinInstance.balanceOf(account).then(balance => {
            return balance.toString(10)
          })
        )
      ).then(balances => {
        // Store accounts in state
        var pplNames = ["Larry", "Bill", "Bonnie", "Nelson"];
        this.setState({
          accounts: accounts.slice(1,5).map((account, idx) => {
            return {
              name: pplNames[idx],
              number: account, 
              nvcBalance: this.state.web3.fromWei(balances[idx] / (1000 * this.state.nvcPrice), "ether" ),
              ethBalance: this.state.web3.fromWei(this.state.web3.eth.getBalance(account).toString(), "ether")
            }
          })
        });
      });
    });
  }


  handleBuyNVC(account) {
    this.state.nvCoinCrowdsaleInstance.sendTransaction({ 
      from: account, 
      value: this.state.web3.toWei(this.state.nvcPrice, "ether")
    }).then(function success(data) {
      this.fetchAccounts();
    }.bind(this), function failure (error) {
      console.error(error)
    });
  }


  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">New Venture Coin Demo</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>What can I do?</h2>
              <p>Use the buttons below to purchase New Venture Coins!</p>
              <MasterAccount account={this.state.accounts && this.state.accounts.length > 0 ? this.state.accounts[0] : {}}/>
              <Accounts onBuy={this.handleBuyNVC.bind(this)} accounts={this.state.accounts}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
