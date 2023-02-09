import React from "react"
import Task from "../Task"
import "./TaskList.css"

const TaskList = (props: any) => {
    return (
        <ul className="todo-list">
            <Task/>
        </ul>
    )
}

export default TaskList;