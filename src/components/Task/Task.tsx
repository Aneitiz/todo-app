import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'

import Timer from '../Timer'

interface TaskProps {
  id: any
  createTime: string
  label: string
  deleteItem: React.MouseEventHandler<HTMLButtonElement>
  onToggleDone: React.MouseEventHandler<HTMLInputElement>
  editItemHandler: Function
  done: boolean
  editing: boolean
}

interface TaskState {
  editing: boolean
  done: boolean
  inputValue: string
}
export default class Task extends Component<TaskProps, TaskState> {
  state = {
    editing: false,
    done: false,
    inputValue: '',
  }

  editingToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      editing: !this.state.editing,
      inputValue: this.props.label,
    })
  }

  editTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (this.state.inputValue) {
      this.props.editItemHandler(this.props.id, this.state.inputValue)
      this.setState({
        editing: false,
        inputValue: '',
      })
    }
  }

  onChangeInputValue = (e: { target: HTMLInputElement }) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  render(): React.ReactElement {
    let { label, createTime, done, onToggleDone, deleteItem, id } = this.props
    let taskClass = classNames({
      completed: done,
      editing: this.state.editing,
    })
    return (
      <li className={taskClass}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={done} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="description">
              <Timer />
            </span>
            <span className="description">{`created ${formatDistanceToNow(Date.parse(JSON.parse(createTime)), {
              includeSeconds: true,
            })} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.editingToggle}></button>
          <button className="icon icon-destroy" onClick={deleteItem}></button>
        </div>
        <form onSubmit={this.editTask}>
          <input type="text" className="edit" onChange={this.onChangeInputValue} value={this.state.inputValue} />
        </form>
      </li>
    )
  }
}
