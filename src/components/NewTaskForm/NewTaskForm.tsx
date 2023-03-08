import React, { Component } from 'react'

interface NewTaskFormState {
  label: string
  TimerSeconds: string
  TimerMinutes: string
}

interface NewTaskFormProps {
  addItem: Function
}
export default class NewTaskForm extends Component<NewTaskFormProps, NewTaskFormState> {
  state = {
    label: '',
    TimerSeconds: '',
    TimerMinutes: '',
  }

  onInputChange = (e: { target: HTMLInputElement }) => {
    // @ts-ignore
    this.setState({ [e.target.name]: e.target.value }) //don't know how to type this thing//
  }

  onInputSubmit = (e: React.FormEvent<HTMLFormElement> | { preventDefault: Function }) => {
    e.preventDefault()
    if (this.state.label.trim() !== '') {
      this.props.addItem(this.state.label)
      this.setState({
        label: '',
        TimerMinutes: '',
        TimerSeconds: '',
      })
    }
  }

  render() {
    return (
      <header className="Header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onInputSubmit}>
          <input type="submit" hidden />
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            value={this.state.label}
            name={'label'}
          />
          <input className="new-todo-form__timer" placeholder="Min" type="number" name={'TimerMinutes'} />
          <input className="new-todo-form__timer" placeholder="Sec" type="number" name={'TimerSeconds'} />
        </form>
      </header>
    )
  }
}
