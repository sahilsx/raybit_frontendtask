
import React from 'react';
import '../css/navbar1.css';

const Navbar1 = ({ refreshExpenses }) => {
    const [tasktitle, settasktitle] = React.useState('');
    const [taskamount, settaskamount] = React.useState();
    const [taskdate, settaskdate] = React.useState('');

    const handleClick = async () => {
        if (!tasktitle || taskamount <= 0 || !taskdate) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const res = await fetch("http://localhost:4000/product", {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tasktitle, taskamount, taskdate }),
        });

        if (res.ok) {
            alert("Expense Added Successfully");
            refreshExpenses(); 
            handleCancel(); 
        } else {
            const errorData = await res.json();
            console.error("Error:", errorData);
            alert("Error adding expense: " + errorData.message || "Please try again.");
        }
    };

    const handleCancel = () => {
        settasktitle('');
        settaskamount('');
        settaskdate('');
    };

    return (
        <div>
            <div className="above">
                <h1>Expense Tracker</h1>
                <label className='label'>TITLE</label>
                <input 
                    type="text" 
                    placeholder='Enter Title'
                    value={tasktitle}
                    onChange={(e) => settasktitle(e.target.value)}
                />

                <label className='label'>AMOUNT</label>
                <input 
                    type="number" 
                    placeholder='Enter Amount'
                    value={taskamount}
                    onChange={(e) => settaskamount(Number(e.target.value))}
                />

                <label className='label'>ADD DATE</label>
                <input 
                    className='dates' 
                    type="date" 
                    value={taskdate}
                    onChange={(e) => settaskdate(e.target.value)}
                />

                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleClick}>Add Expenses</button>
            </div>
        </div>
    );
};

export default Navbar1;
