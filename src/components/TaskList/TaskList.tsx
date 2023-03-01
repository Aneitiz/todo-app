import React from 'react'

import Task from '../Task'
import './TaskList.css'

const TaskList: React.FunctionComponent<{
  todoData: any
  deleteItem: Function
  onToggleDone: Function
  editItemHandler: Function
}> = ({ todoData, deleteItem, onToggleDone, editItemHandler }): any => {
  const tasks = todoData.map((element: object) => {
    const { id, ...items }: any = element
    return (
      <Task
        {...items}
        id={id}
        key={id}
        deleteItem={() => deleteItem(id)}
        onToggleDone={() => onToggleDone(id)}
        editItemHandler={editItemHandler}
      />
    )
  })
  return <ul className="todo-list">{tasks}</ul>
}

export default TaskList
