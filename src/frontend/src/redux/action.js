import {ActionTypes} from './type';

export const setUser = (user) => {
    return {
        type: ActionTypes.SET_USER,
        payload: user
    }
}

export const logout = () => {
    return {
        type: ActionTypes.LOGOUT,
    }
}

export const setTasks = (tasks) => {
    return {
        type: ActionTypes.SET_TASKS,
        payload: tasks
    }
}


export const addTask = (flag) => {
    return {
        type: ActionTypes.ADD_TASK,
        payload: flag
    }
}

export const deleteTask = (id) => {
    return {
        type: ActionTypes.DELETE_TASK,
        payload: id
    }
}

export const doneTask = (id) => {
    return {
        type: ActionTypes.DONE_TASK,
        payload: id
    }
}