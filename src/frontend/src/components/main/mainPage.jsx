import './mainPage.css';
import Card from '../card/card';
import AddTask from '../addTask/addTask';

import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setTasks} from '../../redux/action';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// eslint-disable-next-line
import { postData, getResource, getDayName } from '../../service/service';

const MainPage = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(new Date().toJSON().slice(0,10));
    const [days, setDays] = useState([]);
    const {tasks, taskFlag, user} = useSelector(state => state);
    const dispatch = useDispatch();
    


    useEffect(() => {
        getResource(`${process.env.REACT_APP_API_ROOT_URL}/task/${user['login']}`)
            .then(res => {
                dispatch(setTasks(res));
                setDays([...new Set(res.map(item => item['date']))])
            });
            // eslint-disable-next-line
    }, [taskFlag])


    const generateTaskForDay = () => {
        if (date.length !== 0 && days.includes(date)) {
            const dayName = `${date} (${getDayName(date)})`;
            const listOfTasksForDay = tasks.filter(task => task['date'] === date);
            if (listOfTasksForDay.length > 0) {
                return (
                    <Card 
                        header={dayName}
                        listOfTasks={listOfTasksForDay}/>
                )
            } else {
                return (
                    <p>Brak zadań w wybranym dniu!</p>
                )
            }
        } else {
            return (
                <p>Brak zadań w wybranym dniu!</p>
            )
        }
    }

    return (
        <div className="main-page">
            <div className="addition-wrapper">
                <AddTask/>
            </div>
            <div className="tasks-wrapper">
                <div className='datepicker-wrapper'>
                    <label htmlFor="task-date-pick" className="date-label">Wybierź dzień: </label>
                    <DatePicker
                    className='form-control' 
                    selected={startDate} 
                    onChange={(date) => {
                        setStartDate(date)
                        setDate(date.toJSON().slice(0,10))
                    }}
                    inline
                    />
                    {/* <input
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    type="date"
                    className='form-control' 
                    id="task-date-pick"
                    /> */}
                </div>
                {generateTaskForDay()}
            </div>
            
        </div>
    )
}

export default MainPage;