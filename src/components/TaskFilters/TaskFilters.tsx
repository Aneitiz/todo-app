import React from 'react'

interface TaskFiltersProps {
  filterChangeHandler: Function
  currentFilter: string
}
const TaskFilters = ({ filterChangeHandler, currentFilter }: TaskFiltersProps) => {
  const buttonsObject = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = buttonsObject.map(({ name, label }) => {
    let className = ''
    if (currentFilter === name) {
      className += 'selected'
    } else {
      className += ''
    }
    return (
      <li key={name}>
        <button type="button" className={className} type="button" onClick={() => filterChangeHandler(name)}>
          {label}
        </button>
      </li>
    )
  })
  return <ul className="filters">{buttons}</ul>
}

export default TaskFilters
