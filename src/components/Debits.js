/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import {useEffect} from "react";

const Debits = ({debits, setDebitList, accountBalance, setAccountBalance}) => {
  // Create the list of Debit items

    const getDebits = async () => {
        const debitList = await fetch('https://johnnylaicode.github.io/api/debits.json')
        const data = await debitList.json();
        let total = 0;
        data.forEach((debit) => {
            total += debit.amount;
        });
        setAccountBalance(accountBalance + total);
        setDebitList(data);
    };

    const addDebit = (e) => {
        e.preventDefault();
        const currDebitList = debits;
        const lastId = currDebitList[currDebitList.length - 1].id
        const currentDate = new Date().toISOString();
        const formData = new FormData(e.target);
        const description = formData.get('description');
        const amount = parseFloat(formData.get('amount'));
        formData.set('description', '');
        formData.set('amount', '');
        setAccountBalance(accountBalance + amount);
        setDebitList([...debits, {description: description, amount: amount.toFixed(2), date: currentDate, id: lastId + 1}]);
    }

    useEffect(() => {
        if(debits.length === 0){
            getDebits();
        }
    }, []);
  let debitsView = () => {
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={addDebit}>
        <input type="text" name="description" />
        <input type="number" name="amount" step="0.0000001" />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
        <p>Account Balance: {accountBalance.toFixed(2)}</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;