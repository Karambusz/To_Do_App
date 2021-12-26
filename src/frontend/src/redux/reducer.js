import {ActionTypes} from './type';


const loggedUser = JSON.parse(localStorage.getItem("user"));
const initialState =  loggedUser ? {
    user: loggedUser,
    isLogged: true,
    tasks: [],
    taskFlag: false
} :
{
    user: null,
    isLogged: false,
    tasks: [],
    taskFlag: false
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_USER: 
            return {
                ...state,
                isLogged: true,
                user: action.payload
            }
        case ActionTypes.LOGOUT: 
            return {
                ...state,
                isLogged: false,
                user: null,
                acceptedProblems: []
            }
        case ActionTypes.SET_TASKS: 
            return {
                ...state,
                tasks: action.payload
            }
        case ActionTypes.ADD_TASK: 
            return {
                ...state,
                taskFlag: action.payload
            }
        case ActionTypes.DELETE_TASK:
            const index = state.tasks.findIndex(elem => elem.id === action.payload);
            const newArr = [...state.tasks.slice(0, index), ...state.tasks.slice(index+1)]; 
            return {
                ...state,
                tasks: newArr
            }
        case ActionTypes.DONE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(
                    (task) => task.id === action.payload ? {...task, status: 'DONE'}
                                                      : task
                )
            }
        default:
            return state
    }
}

export default reducer;