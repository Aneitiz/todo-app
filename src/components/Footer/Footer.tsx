import React, { Component } from 'react'

import './Footer.css'
import TaskFilters from '../TaskFilters'

export default class Footer extends Component<
  {
    activeItemsLeft: number
    clearCompleted: React.MouseEventHandler<HTMLButtonElement>
    filterChangeHandler: any
    currentFilter: string
  },
  object
> {
  render() {
    const { activeItemsLeft, clearCompleted, filterChangeHandler, currentFilter } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{activeItemsLeft} items left</span>
        <TaskFilters filterChangeHandler={filterChangeHandler} currentFilter={currentFilter} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
