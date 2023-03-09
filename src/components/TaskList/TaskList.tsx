import React from 'react'

import Task from '../Task'

interface TaskListProps {
  todoData: any
  deleteItem: Function
  onToggleDone: Function
  editItemHandler: Function
  onTimer: Function
}
const TaskList: React.FunctionComponent<TaskListProps> = ({
  todoData,
  deleteItem,
  onToggleDone,
  editItemHandler,
  onTimer,
}): any => {
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
        onTimer={onTimer}
      />
    )
  })
  return <ul className="todo-list">{tasks}</ul>
}

export default TaskList
