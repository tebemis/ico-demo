import React, { Component } from 'react'
import AccountItem from './AccountItem'

class Accounts extends Component {

  buyNVC(account) {
    this.props.onBuy(account)
  }

  render() {
    let accountsItems;
    if (this.props.accounts) {
      accountsItems = this.props.accounts.map(account => {
        return (
          <AccountItem onBuy={this.buyNVC.bind(this)} key={account.number} account={account} />
        );
      });
    }
    return (
      <div className="Accounts">
        <h2>Participants</h2>
        {accountsItems}
      </div>
    );
  }
}

export default Accounts;
