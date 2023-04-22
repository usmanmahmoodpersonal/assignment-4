/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

const App = () => {
  // Create and initialize state
    const [accountBalance, setAccountBalance] = useState(100);
    const [creditList, setCreditList] = useState([]);
    const [debitList, setDebitList] = useState([]);
    const [currentUser, setCurrentUser] = useState({userName: 'Joe Smith',
      memberSince: '11/22/99'});




  // Update state's currentUser (userName) after "Log In" button is clicked
  const mockLogIn = (logInInfo) => {
    const newUser = {...currentUser};
    newUser.userName = logInInfo.userName;
    setCurrentUser(newUser);
  }

  // Create Routes and React elements to be rendered using React components
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={accountBalance} setAccountBalance={setAccountBalance} credits={creditList} />)
    const UserProfileComponent = () => (
      <UserProfile userName={currentUser.userName} memberSince={currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={currentUser} mockLogIn={mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={creditList} setCreditList={setCreditList} accountBalance={accountBalance} setAccountBalance={setAccountBalance} />)
    const DebitsComponent = () => (<Debits debits={debitList} setDebitList={setDebitList} accountBalance={accountBalance} setAccountBalance={setAccountBalance} />)

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-4">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
}

export default App;
