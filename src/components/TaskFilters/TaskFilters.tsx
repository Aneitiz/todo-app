import React, { Component } from 'react'
import './TaskFilters.css'

export default class TaskFilters extends Component<{ filterChangeHandler: Function; currentFilter: string }, {}> {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const buttons = this.buttons.map(({ name, label }) => {
      const { filterChangeHandler, currentFilter } = this.props
      let className = ''
      if (currentFilter === name) {
        className += 'selected'
      } else {
        className += ''
      }
      return (
        <li key={name}>
          <button
            className={className}
            type="button"
            onClick={() => {
              filterChangeHandler(name)
            }}
          >
            {label}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}
