import React, { Component } from 'react'
import Button from 'material-ui/Button';

class AccountItem extends Component {

  buyNVC(account) {
    this.props.onBuy(account);
  }

  render() {
    return (
      <div className="Account">
        <h3> {this.props.account.name} </h3>
        <dl>
          <dt>Account number</dt>
          <dd>{this.props.account.number}</dd>
          <dt>Balance (Ether)</dt>
          <dd>{this.props.account.ethBalance}</dd>
          <dt>Balance (New Venture Coin)</dt>
          <dd>{this.props.account.nvcBalance}</dd>
        </dl>
        <Button raised color="primary" onClick={this.buyNVC.bind(this, this.props.account.number)}>
          Buy New Venture Coin
        </Button>
        <hr />
      </div>
    );
  }
}

export default AccountItem;
