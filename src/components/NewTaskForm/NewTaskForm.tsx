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
      const { label, TimerSeconds, TimerMinutes } = this.state
      const leftTime = Number(TimerMinutes) * 60 + Number(TimerSeconds)
      this.props.addItem(label, leftTime)
      this.setState({
        label: '',
        TimerMinutes: '',
        TimerSeconds: '',
      })
    }
  }

  render() {
    console.log(this.state)
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
          <input
            className="new-todo-form__timer"
            value={this.state.TimerMinutes}
            placeholder="Min"
            type="number"
            name="TimerMinutes"
            onChange={this.onInputChange}
          />
          <input
            className="new-todo-form__timer"
            value={this.state.TimerSeconds}
            placeholder="Sec"
            type="number"
            name="TimerSeconds"
            onChange={this.onInputChange}
          />
        </form>
      </header>
    )
  }
}
