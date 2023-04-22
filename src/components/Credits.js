/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import {useEffect} from 'react';

const Credits = ({credits, setCreditList, accountBalance, setAccountBalance}) => {

 const getCredits = async () => {
     console.log("Entered");
     const creditsList = await fetch('https://johnnylaicode.github.io/api/credits.json')
     const data = await creditsList.json();
     let total = 0;
     data.forEach((credit) => {
         total -= credit.amount;
     });
     setAccountBalance(accountBalance + total);
     setCreditList(data);
 }

    let creditsView = () => {
        return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
            let date = credit.date.slice(0,10);
            return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
        });
    }


    const addCredit = (e) => {
        e.preventDefault();
        const currCreditList = credits;
        const lastId = currCreditList[currCreditList.length - 1].id
        const currentDate = new Date().toISOString();
        const formData = new FormData(e.target);
        const description = formData.get('description');
        const amount = parseFloat(formData.get('amount'));
        setAccountBalance(accountBalance - amount);
        setCreditList([...credits, {description: description, amount: amount.toFixed(2), date: currentDate, id: lastId + 1}]);
    }

     useEffect(() => {
         if(credits.length === 0) {
             getCredits();
         }
     }, [])


    return (
        <div>
            <h1>Credits</h1>

            {creditsView()}

            <form onSubmit={addCredit}>
                <input type="text" name="description" />
                <input type="number" name="amount" step="0.0000001" />
                <button type="submit">Add Credit</button>
            </form>
            <br/>
            <p> Account Balance: {accountBalance.toFixed(2)}</p>
            <br/>
            <Link to="/">Return to Home</Link>
        </div>
    );
}

export default Credits;