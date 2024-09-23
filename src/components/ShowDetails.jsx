


import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/expense.css';
const Details = () => {
    const [taskii, setTaskii] = React.useState([]);
    const location = useLocation();
    const { task } = location.state || {}; 

    console.log(task, "mytasks"); 

    useEffect(() => {
        if (task) {
            setTaskii(task); 
        }
    }, [task]); 

    return (
        <div className='bsg'>
            {taskii.length > 0 ? ( 
                taskii.map((taski) => (
                    <div className="extraa" key={taski.id}>
                        <li className='date'>{new Date(taski.taskdate).toLocaleDateString()}</li>
                        <li className="title">{taski.tasktitle}</li>
                        <li className="amount">${taski.taskamount}</li>
                    </div>
                ))
            ) : (
                <h1>No tasks available</h1>
            )}
        </div>
    );
};

export default Details;
