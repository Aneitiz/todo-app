import React, { Component } from 'react'
import './Task.css'
import { formatDistanceToNow } from 'date-fns'

const className = {
  completed: 'completed',
  editing: 'editing',
}

export default class Task extends Component<
  {
    id: number | string
    createTime: string
    label: string
    deleteItem: React.MouseEventHandler<HTMLButtonElement>
    onToggleDone: React.MouseEventHandler<HTMLInputElement>
    editItem: Function
    done: boolean
    editing: boolean
  },
  {
    editing: boolean
    inputValue: string
  }
> {
  state = {
    editing: false,
    inputValue: '',
  }

  editingHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      editing: !this.state.editing,
      inputValue: this.props.label,
    })
  }

  editTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (this.state.inputValue) {
      this.props.editItem(this.props.id, this.state.inputValue)
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
    let { id, label, createTime, done, onToggleDone, deleteItem } = this.props
    let taskClass = ''
    if (done) {
      taskClass += className.completed
    }
    if (this.state.editing) {
      taskClass += className.editing
    } else {
      taskClass += ''
    }
    return (
      <li key={id} className={taskClass}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{`created ${formatDistanceToNow(Date.parse(JSON.parse(createTime)), {
              includeSeconds: true,
            })} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.editingHandler}></button>
          <button className="icon icon-destroy" onClick={deleteItem}></button>
        </div>
        <form onSubmit={this.editTask}>
          <input type="text" className="edit" onChange={this.onChangeInputValue} value={this.state.inputValue} />
        </form>
      </li>
    )
  }
}
