import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'

import Timer from '../Timer'

interface TaskProps {
  id: any
  createTime: string
  label: string
  deleteItem: React.MouseEventHandler<HTMLButtonElement>
  onToggleDone: React.MouseEventHandler<HTMLInputElement>
  onTimer: Function
  editItemHandler: Function
  done: boolean
  timeLeft: number
}

const Task = ({
  label,
  createTime,
  done,
  onToggleDone,
  onTimer,
  deleteItem,
  id,
  timeLeft,
  editItemHandler,
}: TaskProps) => {
  const [Editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  let taskClass = classNames({
    completed: done,
    editing: Editing,
  })
  const editTask = (e: any) => {
    e.preventDefault()
    if (inputValue) {
      editItemHandler(id, inputValue)
      setEditing(false)
      setInputValue('')
    }
  }
  const editingToggle = () => {
    setEditing(!Editing)
    setInputValue(label)
  }

  const onChangeInputValue = (e: { target: HTMLInputElement }) => {
    setInputValue(e.target.value)
  }

  return (
    <li className={taskClass}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done} />
        <label htmlFor={id}>
          <span className="description">{label}</span>
          <span className="description">
            <Timer onTimer={onTimer} timeLeft={timeLeft} id={id} done={done} />
          </span>
          <span className="description">{`created ${formatDistanceToNow(Date.parse(JSON.parse(createTime)), {
            includeSeconds: true,
          })} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={editingToggle}></button>
        <button type="button" className="icon icon-destroy" onClick={deleteItem}></button>
      </div>
      <form onSubmit={editTask}>
        <input
          type="text"
          className="edit"
          onChange={onChangeInputValue}
          value={inputValue}
          ref={(inputElement) => {
            if (inputElement) {
              inputElement.focus()
            }
          }}
        />
      </form>
    </li>
  )
}

export default Task
