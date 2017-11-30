import React, { Component } from 'react'

class MasterAccount extends Component {

  render() {
    return (
        <div className="MasterAccount" >
          <h2> New Venture Challenge Account </h2>
          <dl>
            <dt>Account number</dt>
            <dd>{this.props.account.number}</dd>
            <dt>Balance (Ether)</dt>
            <dd>{this.props.account.ethBalance}</dd>
          </dl>
          <hr />
          <hr />
          <hr />
        </div>
      ); 
  }
}

export default MasterAccount;
