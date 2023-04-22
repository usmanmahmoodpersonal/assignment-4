/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, {Component} from 'react';

const AccountBalance = ({accountBalance}) => {
  // Display account balance

    return (
      <div>
        Balance: {accountBalance}
      </div>
    );

}

export default AccountBalance;