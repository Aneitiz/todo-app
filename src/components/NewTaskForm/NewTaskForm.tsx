import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component<
  {
    addItem: Function
  },
  {
    label: string
  }
> {
  state = {
    label: '',
  }

  onInputChange = (e: { target: HTMLInputElement }) => {
    this.setState({ label: e.target.value })
  }

  onInputSubmit = (e: React.FormEvent<HTMLFormElement> | { preventDefault: Function }) => {
    e.preventDefault()
    if (this.state.label.trim() !== '') {
      this.props.addItem(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <header className="Header">
        <h1>todos</h1>
        <form onSubmit={this.onInputSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            value={this.state.label}
          />
        </form>
      </header>
    )
  }
}
