import React from 'react'

import TaskFilters from '../TaskFilters'

interface FooterProps {
  activeItemsLeft: number
  clearCompleted: React.MouseEventHandler<HTMLButtonElement>
  filterChangeHandler: any
  currentFilter: string
}
const Footer = ({ activeItemsLeft, clearCompleted, filterChangeHandler, currentFilter }: FooterProps) => {
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

export default Footer
