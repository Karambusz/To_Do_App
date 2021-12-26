import './addTask.css';
import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { validateTextField, postData, getResource} from '../../service/service';
import {addTask} from '../../redux/action';


const AddTask = () => {
    const {taskFlag, user} = useSelector(state => state);
    const dispatch = useDispatch();

    const [date, setDate] = useState('');
    const [task, setTask] = useState('');
    const [categoryTask, setCategoryTask] = useState('');
    const [category, setCategory] = useState('');
    const [option, setOption] = useState([]);


    const [categoryMessage, setCategoryMessage] = useState(null);
    const [taskMessage, setTaskMessage] = useState(null);

    const [categoryClass, setCategoryClass] = useState('form-control');

    const clearCategoryErrorAfterFocus = (setter) => {
        setCategoryMessage(null);
        setter('form-control');
    }

    useEffect(() => {
        getResource(`${process.env.REACT_APP_API_ROOT_URL}/category`)
            .then(res => {
                setOption(res);
                if (res.length > 0) {
                    setCategoryTask(res[0].name);
                }
            });
    }, [categoryMessage])

    const generateCategories = () => {
        return option.map((item, idx) => {
            return <option key={`option-${item.id}`} value={item.name}>{item.name}</option>
        })
    }

    const handleTaskAddition = (e) => {
        e.preventDefault();
        const data = {
            description: task,
            date,
            category: {
                name: categoryTask
            }
        }

        postData(`${process.env.REACT_APP_API_ROOT_URL}/task/${user['login']}`, JSON.stringify(data))
            .then(res => {
                    if (res.status === 200) {
                        dispatch(addTask(!taskFlag));
                        setTaskMessage(<span><p className='success'>{res.message}</p></span>);
                        setTask('');
                    }
                    else {
                        setTaskMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                    }
            })
            .catch(e => {
                setTaskMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                console.log(e)
            });
    }



    const handleCategoryAddition = (e) => {
        e.preventDefault();
        const data = {
            name: category
        }
        if (!validateTextField(category)) {
            postData(`${process.env.REACT_APP_API_ROOT_URL}/category`, JSON.stringify(data))
            .then(res => {
                if (res.status === 200) {
                    setCategoryMessage(<span><p className='success'>{res.message}</p></span>);
                    setCategory('');
                }
                else {
                    setCategoryMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                }
            })
            .catch(e => {
                setCategoryMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                console.log(e)
            });
        } else {
            setCategoryClass("form-control error")
        }
    }


    return (
        <div className="main-wrapper">
            <div className="add-task-wrapper">
                <form onSubmit={handleTaskAddition}>
                <h2>Dodaj nowe zadanie</h2>
                    <div>
                        <label htmlFor="add-task-date" className="date-label">Dzień</label>
                        <input
                        onFocus={() => setTaskMessage(null)}
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        type="date"
                        className='form-control' 
                        id="add-task-date"
                        required/>
                    </div>
                    <div>
                        <label htmlFor="add-task-description" className="password-label">Opis zadania</label>
                        <textarea
                        onFocus={() => setTaskMessage(null)}
                        value={task} 
                        onChange={(e) => setTask(e.target.value)}  
                        type="text" 
                        className='form-control' 
                        id="add-task-description" 
                        placeholder="Opis" 
                        rows={3}
                        required/>
                    </div>
                    <div>
                    <label htmlFor="category-select">Kategoria</label>
                        <select onFocus={() => setTaskMessage(null)} value={categoryTask} onChange={(e) => setCategoryTask(e.target.value)}   className='form-control' name="categories" id="category-select" required>
                            {generateCategories()}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Dodaj zadanie
                    </button>
                </form>
                {taskMessage}
            </div>
            <div className="add-category-wrapper">
            <form onSubmit={handleCategoryAddition}>
                <h2>Brak odpowiedniej kategorii?</h2>
                <span>Dodaj nową kategorię</span>
                <div>
                    <label htmlFor="add-category-name" className="category-label">Kategoria</label>
                    <input
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    onFocus={() => clearCategoryErrorAfterFocus(setCategoryClass)}
                    type="text" 
                    className={categoryClass}
                    id="add-category-name" 
                    placeholder="Kategoria" 
                    required/>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary">
                    Dodaj kategorię
                    </button>
            </form>
            {categoryMessage}
            </div>
        </div>
    )
}

export default AddTask;