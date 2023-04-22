/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component, useEffect} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

const Home = ({accountBalance, credits}) => {
    useEffect(() => {
        console.log(credits);
    }, [])
    return (
      <div>
        <img src="https://picsum.photos/200/200" alt="bank"/>

        <h1>Bank of React</h1>

        <Link to="/userProfile">User Profile</Link>
        <br/>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/credits">Credits (to be implemented in the Assignment)</Link>
        <br/>
        <Link to="/debits">Debits (to be implemented in the Assignment)</Link>
        <br/><br/>
        <AccountBalance accountBalance={accountBalance.toFixed(2)}/>
      </div>
    );
}

export default Home;