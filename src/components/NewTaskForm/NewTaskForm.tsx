import React, { useState } from 'react'

interface NewTaskFormProps {
  addItem: Function
}

const NewTaskForm = ({ addItem }: NewTaskFormProps) => {
  const [label, setLabel] = useState('')
  const [TimerSeconds, setTimerSeconds] = useState('')
  const [TimerMinutes, setTimerMinutes] = useState('')

  const functionalState = {
    label: setLabel,
    TimerSeconds: setTimerSeconds,
    TimerMinutes: setTimerMinutes,
  }
  const onInputChange = (e: { target: HTMLInputElement }) => {
    //@ts-ignore
    functionalState[e.target.name](e.target.value)
  }

  const onInputSubmit = (e: React.FormEvent<HTMLFormElement> | { preventDefault: Function }) => {
    e.preventDefault()
    const leftTime = Number(TimerMinutes) * 60 + Number(TimerSeconds)
    addItem(label, leftTime)
    setLabel('')
    setTimerMinutes('')
    setTimerSeconds('')
  }
  return (
    <header className="Header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onInputSubmit}>
        <input type="submit" hidden />
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onInputChange}
          value={label}
          name={'label'}
        />
        <input
          className="new-todo-form__timer"
          value={TimerMinutes}
          placeholder="Min"
          type="number"
          min={0}
          max={9999}
          name="TimerMinutes"
          onChange={onInputChange}
        />
        <input
          className="new-todo-form__timer"
          value={TimerSeconds}
          placeholder="Sec"
          min={0}
          max={99}
          type="number"
          name="TimerSeconds"
          onChange={onInputChange}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
