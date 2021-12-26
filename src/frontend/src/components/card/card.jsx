import './card.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from 'react-redux';
import {deleteTask, doneTask} from '../../redux/action';
import {postWithoutData, deleteData, compare } from '../../service/service';


const Card = (props) => {
    const {header, listOfTasks} = props;

    const {user} = useSelector(state => state);
    const [doneTaskFlag, setDoneTaskFlag] = useState(false);
    const [deleteTaskFlag, setDeleteTaskFlag] = useState(false);
    const [idDone, setIdDone] = useState(0);
    const [idDelete, setIdDelete] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (deleteTaskFlag === true) {
            deleteData(`${process.env.REACT_APP_API_ROOT_URL}/task/${idDelete}`)
                .then(res => {
                    if (res.status === 200) {

                        dispatch(deleteTask(idDelete));
                        setDeleteTaskFlag(false);
                    }
                })
        }
        // eslint-disable-next-line
    }, [deleteTaskFlag])

    useEffect(() => {
        if (doneTaskFlag === true) {
            postWithoutData(`${process.env.REACT_APP_API_ROOT_URL}/task/${user['login']}/${idDone}`)
                .then(res => {
                    if (res.status === 200) {
                        dispatch(doneTask(idDone));
                        setDoneTaskFlag(false);
                    }
                })
        }
        // eslint-disable-next-line
    }, [doneTaskFlag])

    const markTask = (id) => {
        setIdDone(id);
        setDoneTaskFlag(true);
    }

    const deleteTaskFromList = (id) => {
        setIdDelete(id);
        setDeleteTaskFlag(true);
    }

    const spinner = <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>;

    const generateListItems = () => {
        const sortedList = listOfTasks.sort(compare);
        return sortedList.map(task => {
            const doneIcon = <FontAwesomeIcon
                onClick={() => markTask(task.id)} 
                className='done' 
                icon={faCheck} />;
            return (
                <li key={task.id} className="list-group-item">
                    {
                    task.status === "TO_DO" ?  <div className="description">
                                                    [{task.category}] {task.description}
                                                </div> :
                                                <div className="description strike">
                                                    [{task.category}] {task.description}
                                                </div>
                    }
                    {deleteTaskFlag && task.id === idDelete ? spinner
                                :
                        <>
                        <div className="done-icon-wrapper">
                            {task.status === "TO_DO" ? doneIcon : null}
                        </div>
                        <div  className="delete-icon-wrapper">
                        <span onClick={() => deleteTaskFromList(task.id)}>&#10060;</span>
                        </div>
                        </>
                    }
                </li>
            )
        })
    }

    return (
        <div className="card" style={{"maxWidth": "100%"}}>
            <div className="card-header">{header}</div>
            <div className="card-body">
                <h5 className="card-title">Zadania:</h5>
                <ul className="list-group list-group-flush">
                    {generateListItems()}
            </ul>
            </div>
        </div> 
         
    )
}

export default Card;
