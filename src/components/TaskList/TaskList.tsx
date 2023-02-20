import React from "react";
import Task from "../Task";
import "./TaskList.css";


const TaskList : React.FunctionComponent<{todoData : any, deleteItem : Function, onToggleDone : Function, editItem : Function}> = ({todoData, deleteItem, onToggleDone, editItem}) : any => {
    const tasks = todoData.map((element: object) => {
        const {id, ...items} : any = element
        return (<Task {...items}
                     id={id}
                     key={id}
                     deleteItem = {() => deleteItem(id)}
                     onToggleDone = {() => onToggleDone(id)}
                     editItem = {editItem}/>)
    })
    return (
        <ul className="todo-list">{tasks}</ul>
    )
}

export default TaskList;