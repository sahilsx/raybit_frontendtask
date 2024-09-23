
import React from 'react';
import '../css/expense.css';
import Navbar1 from './Navbar1'; 
import {useNavigate} from 'react-router-dom';

const Expenses = () => {
    const navigate = useNavigate();
    const [task, settask] = React.useState([]);

    const fetchExpenses = async () => {
        try {
            const response = await fetch("http://localhost:4000/product");
            const data = await response.json();
            if (response.ok) {
                settask(data.tasks);
            } else {
                console.error("Failed to fetch tasks:", data);
                settask([]);
            }
        } catch (err) {
            console.log(err);
            settask([]);
        }
    };

    React.useEffect(() => {
        fetchExpenses(); 
    }, []); 
      
    const handleItemClick = (task) => {   
        navigate('/details', { state: { task: task } });
    };


    return (
        <div>
            <Navbar1 refreshExpenses={fetchExpenses} /> 
            <div className="expense-item">
                {task.length > 0 ? (
                    task.map((item) => (
                        <div className="extraa" key={item.id}>
                            <li className='date'>{new Date(item.taskdate).toLocaleDateString()}</li>
                            <li className="title">{item.tasktitle}</li>
                            <li className="amount">${item.taskamount}</li>
                           
                        </div>
                    ))
                ) : (
                    <div className="no-expenses">No expenses found.</div>
                )}
                 <button className="" onClick={() => handleItemClick(task)}>Details</button>
            </div>
        </div>
    );
};

export default Expenses;
