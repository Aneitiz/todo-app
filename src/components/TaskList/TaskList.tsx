import React from "react";
import Task from "../Task";
import "./TaskList.css";
import type {stateData} from "../App/App";


const TaskList = (props : stateData ) => {
    return (
        <ul className="todo-list">
            <Task todoData={props.todoData}
                  isCompleted={props.isCompleted}
                  isEditing={props.isEditing}
                  classNames={props.classNames} ></Task>
        </ul>
    )
}

export default TaskList;